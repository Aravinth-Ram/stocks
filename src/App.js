import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Dashboard from './Components/Dashboard'
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar id="AppToolBar">
          <Header />
        </Toolbar>
      </AppBar>
      <Dashboard />
    </div>
  );
}

export default App;
