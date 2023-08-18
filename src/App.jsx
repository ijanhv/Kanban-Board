import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Kanban from './components/Kanban';
import { FilterProvider } from './context/TicketContext';

function App() {
  return (
    <div className="app">
      <FilterProvider>
        <Navbar />
        <Kanban />
      </FilterProvider>
    </div>
  );
}

export default App;
