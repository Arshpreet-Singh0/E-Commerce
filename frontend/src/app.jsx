import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLandingPage from './Pages/MainLandingPage';
import react from 'react';
import NavBar from './components/Navbar';
import Searchbar from './components/SearchNav';

function App() {
  
  return (
    <Router>
      <NavBar/>
      <Searchbar/>
      <Routes>
        <Route path="/" element={<MainLandingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
