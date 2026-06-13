import { useState, useRef } from "react";

export default function DomainSearchBar({ onSearch }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const iconVisible = !focused && !value.trim();

  const handleSearch = () => {
    const val = value.trim();
    if (val) {
      onSearch?.(val);
    } else {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="my-5 rounded-xl max-w-[1250px] w-auto mx-auto h-25 bg-gray-100 flex justify-evenly items-center">
      <div
        className={`flex items-center shadow-xl bg-white rounded-xl w-full max-w-[1000px] h-20 pr-1.5 pl-2 py-1.5 transition-shadow duration-200 ${
          focused ? "ring-2 ring-[#5aace8]" : "ring-0"
        }`}
      >
        {/* Sliding left icon */}
        <div
          className={`flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            iconVisible
              ? "w-[42px] min-w-[42px] opacity-100"
              : "w-0 min-w-0 opacity-0"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 flex-shrink-0"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder="Type the domain you want"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          aria-label="Domain search"
          className="font-bold flex-1 min-w-0 border-0 ring-0 focus:ring-0 focus:outline-none bg-transparent text-2xl text-black-900 px-3 h-11 caret-[#5aace8] placeholder:text-gray-400 placeholder:text-2xl placeholder:font-bold"
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          aria-label="Search domain"
          className="flex font-bold items-center gap-1.5 px-5 py-8 h-11 bg-[#09757A] active:scale-[0.97] text-white text-sm font-medium rounded-lg flex-shrink-0 whitespace-nowrap transition-all duration-150 cursor-pointer border-none"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search Domains
        </button>
      </div>

      <div
        className={`group flex justify-between items-center gap-4 hover:bg-white hover:cursor-pointer rounded-xl w-auto h-20 p-3 transition-all duration-300`}
      >
        <p className="text-xl text-gray-500 font-semibold">.fyi</p>
        <div>
          <p className="font-semibold group-hover:text-blue-500 transition-colors duration-300">
            $9.99/1st yr
          </p>
          <p className="text-sm">Share information with .fyi</p>
        </div>
      </div>
    </div>
  );
}
