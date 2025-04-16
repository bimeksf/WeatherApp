import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export default function SearchBar({ handleForm, handleChange, inputText, inputFocus, suggestions, onSuggestionClick }) {
  const [dropdownVisible, setDropdownVisible] = useState(true); 

  const [activeIndex , setActiveIndex] = useState(0)


  const handleSuggestionClick = (item) => {
    setDropdownVisible(false);
    onSuggestionClick(item);
    setActiveIndex(null) 
  };

  return (
    <form onSubmit={handleForm} className='flex mt-10'>
      <div className='flex items-center relative'>
        <Icon icon="material-symbols:add-location-alt-rounded" width="30" height="30" />
        <input
          type="text"
          className="border-b-2 border-b-black focus:border-b-white focus:border-b-4 p-2 outline-0 dark:border-b-white"
          onChange={handleChange}
          value={inputText}
          placeholder='Location'
          ref={inputFocus}
          onFocus={() => setDropdownVisible(true)}


          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex(prev => {
                const nextIndex = prev === null ? 0 : Math.min(prev + 1, suggestions.length - 1);
                return nextIndex;
              });
            }
          
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex(prev => {
                const nextIndex = prev === null ? suggestions.length - 1 : Math.max(prev - 1, 0);
                return nextIndex;
              });
            }
          
            if (e.key === "Enter") {
              if (activeIndex !== null && suggestions[activeIndex]) {
                e.preventDefault();
                handleSuggestionClick(suggestions[activeIndex]);
              }
            }
          }}
        
        />
        
        {dropdownVisible && (
          <ul className="absolute z-[110] bg-white dark:bg-gray-800 border max-h-60 overflow-y-auto w-auto shadow-md top-13 left-8">
            {suggestions && suggestions.length > 0 ? (
              suggestions.map((item,index ) => (
                <li
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  className={`cursor-pointer hover:bg-[#b6b7de] ${index=== activeIndex ? "bg-[#b6b7de]" : ""}   ` }
                >
                  {item.city}, {item.country}
                </li>
              ))
            ) : (
              inputText && suggestions.length === 0 && (
                <li className="text-gray-400 italic p-2">No results found</li>
              )
            )}
          </ul>
        )}
      </div>

      <button type='submit' className='bg-sky-800 p-2 text-white cursor-pointer rounded-md mx-2'>
        <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
      </button>
    </form>
  );
}
