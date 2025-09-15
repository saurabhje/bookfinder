import { createContext, useContext, useReducer, useCallback } from "react";

const BookContext = createContext();

const initialState = {
  books: [],
  totalResults: 0,
  currentPage: 1,
  query: "Jurassic Park",
  searchType: "title",
  isLoading: true,
  error: null,
  selectedBook: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload, currentPage: 1 };
    case "SET_SEARCH_TYPE":
      return { ...state, searchType: action.payload, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_SELECTED_BOOK":
      return { ...state, selectedBook: action.payload };
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        books: action.payload.docs,
        totalResults: action.payload.numFound,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, books: [], totalResults: 0, error: action.payload };
    default:
      return state;
  }
}

export function BookProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchBooks = useCallback(async () => {
    const { query, searchType, currentPage } = state;
    if (!query) {
      dispatch({ type: "FETCH_SUCCESS", payload: { docs: [], numFound: 0 } });
      return;
    }

    dispatch({ type: "FETCH_START" });
    try {
      const limit = 18;
      const offset = (currentPage - 1) * limit;
      const formattedQuery = encodeURIComponent(query.trim());
      const url = `https://openlibrary.org/search.json?${searchType}=${formattedQuery}&limit=${limit}&offset=${offset}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch books. Try again." });
    }
  }, [state.query, state.searchType, state.currentPage]);

  return (
    <BookContext.Provider value={{ state, dispatch, fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  return useContext(BookContext);
}
