import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';

function App() {
 return (
    <div>
      <h1 style={{ textAlign: 'center' }}>ReuseAI ♻️</h1>
      {/* Item එක Add කරන කොටස */}
      <AddItem />
      
      {/* Save කරපු Items පෙන්නන කොටස */}
      <ViewItems />
    </div>
  );
}

export default App;