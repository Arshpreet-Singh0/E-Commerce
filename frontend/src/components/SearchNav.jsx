import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import cart from '../assets/shopping-cart-6-svgrepo-com.svg';
import "./SearchNav.css";
import DropDown from "./DropDown";
import { useNavigate } from "react-router";
import CartLogo from "./CartLogo";
import { useSelector } from "react-redux";
import { Button } from "antd";
import axios from "axios";
const PRODUCT_API_END_POINT = import.meta.env.VITE_PRODUCT_API_END_POINT;

const SearchNav = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  // const {user} = useSelector(store=>store.auth);
  // const {cartItems} = useSelector(store=>store.cart);

  const handleChange = (value) => {
    setInput(value);
    setShowSuggestions(false); // Hide suggestions on input change

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Clear previous timer
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer
    const newTimer = setTimeout(() => {
      fetchSuggestions(value);
    }, 300); // Adjust the delay as necessary

    setTimer(newTimer);
  };

  const fetchSuggestions = async (value) => {
    setLoading(true);
    setShowSuggestions(true); // Show suggestions when fetching

    try {
      const response = await axios.get(`${PRODUCT_API_END_POINT}/get?keyword=${value}`);
      const data = await response.json();
      const namesArray = data.products ? data.products.map(product => product.name.trim()) : [];
      setSuggestions(namesArray); // Set suggestions based on trimmed names
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200); // Delay to allow click events on suggestions
  };

  const handleSearchButtonClick = ()=>{
    if(!input) return;
    navigate(`/search?search=${input}`);
  }

  return (
    <div className="relative p-2 flex flex-row gap-8 items-center justify-between align-middle ">
      <div id="input" onBlur={handleBlur} className="relative ">
        <FaSearch id="search-icon"/>
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)} // Update input on change
          // className="border border-gray-300 rounded-md p-2" // Add some basic styles
        />
        <Button type="primary" onClick={handleSearchButtonClick}>Search</Button>
        
        {/* Suggestions Section */}
        {loading ? (
          <div className="absolute left-0 right-0 top-full z-20">Loading...</div>
        ) : (
          showSuggestions && ( // Render suggestions only if showSuggestions is true
            <div id="search" className="absolute z-20 suggestions left-0 right-0 top-full shadow-lg max-h-60 overflow-y-auto">
              {suggestions.length > 0 ? (
                <ul className="p-2">
                  {suggestions.map((suggestion, index) => (
                    <li 
                      className="cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors p-1" 
                      key={index}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              ) : (
                input && <div className="p-2">No results found</div>
              )}
            </div>
          )
        )}
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row gap-4 items-center justify-between">
        {/* <div className="w-full md:w-auto">
          <DropDown />
        </div> */}
        <button className="p-2 rounded-lg transition transform hover:scale-105 focus:ring-2 focus:ring-blue-300" onClick={()=>navigate("/cart")}>
          <CartLogo/>
        </button>
      </div>
    </div>
  );
};

export default SearchNav;
