import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import SearchNav from './components/SearchNav';

function App() {
  const content = {
    paddingTop: '4rem'
  }
  return (
    <div style={content}>
      <Navbar />
      <SearchNav />
      <Outlet />
    </div>
  );
}

export default App;
