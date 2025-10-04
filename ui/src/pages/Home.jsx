import { useEffect } from "react";
import { useBookContext } from "../context/BookContext";
import { Link } from 'react-router-dom'
import { BookIcon } from "../icons/BookIcon";
import SearchBar from "../components/SearchBar";
import ResultsHeader from "../components/ResultsHeader";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import BookDetailModal from "../components/BookDetailModal";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { state, fetchBooks } = useBookContext();
  const { user } = useAuth()
  useEffect(() => {
    fetchBooks();
  }, [state.query, state.searchType, state.currentPage, fetchBooks]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white border-b border-gray-200 py-4 flex justify-between w-full">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <BookIcon />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Book Finder
          </h1>
        </div>
        <div className="pr-4 sm:px-6 lg:px-8">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-sm font-medium">
                {user.username || user.name}
              </span>
              <img
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
                  user.username || user.name
                )}`}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-pink-500 hover:scale-110 transition-transform cursor-pointer"
                title="Your Profile"
              />
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-transparent border border-pink-600 text-pink-600 py-2 px-5 rounded-md hover:bg-pink-600 hover:text-white transition-colors duration-200">
                Login
              </button>
            </Link>
          )}
        </div>
      </header>

      <SearchBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResultsHeader />
        <BookList />
        <Pagination />
      </main>
      <BookDetailModal />
    </div>
  );
}
