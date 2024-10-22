import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import SearchNav from './components/SearchNav';
import Footer from './components/Footer';

function App() {
  const content = {
    paddingTop: '4rem'
  }
  return (
    <div style={content}>
      <Navbar />
      <SearchNav />
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;
