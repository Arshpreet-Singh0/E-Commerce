import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import cart from '../assets/shopping-cart-6-svgrepo-com.svg';
import "./SearchNav.css";
import DropDown from "./DropDown";
import { useNavigate } from "react-router";

const SearchNav = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();

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
      const response = await fetch(`http://localhost:8080/api/v1/product/get?keyword=${value}`);
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

  return (
    <div className="relative bg-[#E4E0E1] p-2 flex flex-row gap-8 items-center justify-between align-middle">
      <div id="input" onBlur={handleBlur} className="relative">
        <FaSearch id="search-icon" />
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)} // Update input on change
          // className="border border-gray-300 rounded-md p-2" // Add some basic styles
        />
        
        {/* Suggestions Section */}
        {loading ? (
          <div className="absolute top-3 z-20">Loading...</div>
        ) : (
          showSuggestions && ( // Render suggestions only if showSuggestions is true
            <div className="absolute z-20 suggestions left-0 right-0 top-full bg-white shadow-lg max-h-60 overflow-y-auto">
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
        <div className="w-full md:w-auto">
          <DropDown />
        </div>
        <button className="p-2 rounded-lg transition transform hover:scale-105 focus:ring-2 focus:ring-blue-300" onClick={()=>navigate("/cart")}>
          <img className="w-10 h-6 md:w-12 md:h-8" src={cart} alt="cart icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchNav;
