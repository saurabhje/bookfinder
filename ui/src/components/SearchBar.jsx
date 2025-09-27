import { useState, useEffect } from "react";
import { useBookContext } from "../context/BookContext";
import { SearchIcon } from "../icons/SearchIcon";

export default function SearchBar() {
  const { state, dispatch, fetchBooks } = useBookContext();
  const { searchType } = state;
  const setSearchType = (type) => dispatch({ type: "SET_SEARCH_TYPE", payload: type });
  const [inputValue, setInputValue] = useState(state.query);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== state.query) {
        dispatch({ type: "SET_QUERY", payload: inputValue });
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue, state.query, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  
  return (
    <div className="bg-white/70 backdrop-blur-lg sticky top-0 z-20 shadow-md p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for a book..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-600 transition-shadow duration-200"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-pink-600 transition-shadow duration-200"
            >
              <option value="q">All</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="subject">Subject</option>
            </select>
            <button
              type="submit"
              className="w-full sm:w-auto bg-pink-600 text-white font-base py-2 px-5 rounded-md hover:bg-pink-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
