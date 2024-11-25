import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios'; // Assuming you're using axios to make API requests
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../redux/CategorySlice';

export default function DropDown() {
  const {categories} = useSelector(store=>store.category);
  const dispatch = useDispatch();

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/category/get'); // Replace with your actual API URL
        // console.log(response.data)
        dispatch(setCategories(response?.data?.categories));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Categories
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
       <div className="py-1">
          {categories.length > 0 ? (
            categories.map((category) => (
              <MenuItem key={category._id}>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex items-center"
                >
                  {category.name}
                </a>
              </MenuItem>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No categories available</div>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
}
