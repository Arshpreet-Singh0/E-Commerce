import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import SearchNav from './components/SearchNav';
import Footer from './components/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from "./utils/constant.js"
import { useDispatch } from 'react-redux';
import { setUser } from './redux/authSlice';
import { setCartItems } from './redux/cartSlice.js';

function App() {
  const content = {
    paddingTop: '4rem'
  }
  const dispatch = useDispatch();

  useEffect(()=>{
    const verifyUser = async()=>{
      try {
        const res = await axios.post(`${USER_API_END_POINT}`, {}, {
          withCredentials: true
        });
        // console.log(res);
        

        if(res?.data?.success){
            dispatch(setUser(res?.data?.user));
            
            dispatch(setCartItems(res?.data?.cart));
        }
      } catch (error) {
        // console.log(error);
        
      }
    };
    verifyUser();
  },[]);
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
