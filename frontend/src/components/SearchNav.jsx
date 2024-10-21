import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import cart from '../assets/shopping-cart-6-svgrepo-com.svg'
import "./SearchNav.css";
import DropDown from "./DropDown";
// { setResults }
const SearchNav = () => {
  const [input, setInput] = useState("");

//   const fetchData = (value) => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter((user) => {
//           return (
//             value &&
//             user &&
//             user.name &&
//             user.name.toLowerCase().includes(value)
//           );
//         });
//         setResults(results);
//       });
//   };

//   const handleChange = (value) => {
//     setInput(value);
//     fetchData(value);
//   };

  return (
    <div className="bg-[#F6F1EE] p-6 flex flex-row gap-8 items-center justify-between">
        <div id="input">
          <FaSearch id="search-icon" />
          <input
            placeholder="Type to search..."
            value={input}
            // onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-auto">
          <DropDown />
        </div>
        <button className="p-2 rounded-lg transition transform hover:scale-105 focus:ring-2 focus:ring-blue-300">
          <img className="w-10 h-6 md:w-12 md:h-8" src={cart} alt="cart icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchNav;