import { useEffect } from "react";
import { useBookContext } from "./context/BookContext";
import { BookIcon } from "./icons/BookIcon";
import SearchBar from "./components/SearchBar";
import ResultsHeader from "./components/ResultsHeader";
import BookList from "./components/BookList";
import Pagination from "./components/Pagination";
import BookDetailModal from "./components/BookDetailModal";

export default function App() {
  const { state, fetchBooks } = useBookContext();

  useEffect(() => {
    fetchBooks();
  }, [state.query, state.searchType, state.currentPage, fetchBooks]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <BookIcon />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Book Finder
          </h1>
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
