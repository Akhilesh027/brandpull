import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import Navbar from './Components/Navbar/Navbar';
import Allroutes from './Allroutes';
import axios from 'axios';

function App() {
  return (
    <Router>
      <Navbar/>
      <Allroutes/>
    </Router>
  );
}

export default App;
