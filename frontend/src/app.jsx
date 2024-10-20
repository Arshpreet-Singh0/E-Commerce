import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLandingPage from './Pages/MainLandingPage';
import react from 'react';
import NavBar from './components/Navbar';

function App() {
  
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<MainLandingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
