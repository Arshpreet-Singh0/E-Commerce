import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import SearchNav from './components/SearchNav';

function App() {

  return (
    <>
      <Navbar />
      <SearchNav/>
      <Outlet />
    </>
  );
}

export default App;
