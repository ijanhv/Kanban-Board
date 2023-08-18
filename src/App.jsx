import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Kanban from './components/Kanban';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Kanban />
    </div>
  );
}

export default App;
