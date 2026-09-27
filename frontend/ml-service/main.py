from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

# Dataset එක Load කරගන්නවා
df = pd.read_csv("dataset.csv")
# Columns එකතු කරලා එක text එකක් හදාගන්නවා
df['combined_features'] = df['name'] + " " + df['material'] + " " + df['condition']

# TF-IDF Vectorizer එක setup කරනවා
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df['combined_features'])

# Frontend එකෙන් එන Data format එක
class Item(BaseModel):
    name: str
    material: str
    condition: str

@app.post("/recommend")
def recommend_reuse(item: Item):
    # Userගේ data ටිකත් text එකක් කරනවා
    user_text = f"{item.name} {item.material} {item.condition}"
    user_tfidf = vectorizer.transform([user_text])
    
    # Cosine Similarity එක calculate කරනවා
    cosine_sim = cosine_similarity(user_tfidf, tfidf_matrix)
    
    # ලකුණු වැඩි පිළිවෙලට හදාගන්නවා
    sim_scores = list(enumerate(cosine_sim[0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # ගැලපෙනම උත්තර 3 තෝරනවා
    top_3 = sim_scores[0:3]
    
    results = []
    for index, score in top_3:
        match_percentage = round(score * 100, 1)
        
        # ගැලපීමක් තියෙනවා නම් පමණක් results වලට දානවා
        if match_percentage > 0:
            results.append({
                "reuse_option": df.iloc[index]['reuse_option'],
                "match_score": match_percentage
            })
            
    # Dataset එකේ කිසිම ගැලපීමක් නැත්නම් (0% match), සාමාන්‍ය අදහස් ටිකක් යවනවා
    if len(results) == 0:
        results = [
            {"reuse_option": "Creative DIY Art Project", "match_score": 0},
            {"reuse_option": "Upcycle into a decorative piece", "match_score": 0},
            {"reuse_option": "Use as a small storage container or planter", "match_score": 0}
        ]
        
    return {"recommendations": results}