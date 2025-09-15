import { useBookContext } from "../context/BookContext";
import { BookIcon } from "../icons/BookIcon";

const BookCard = ({ book }) => {
  const { state, dispatch } = useBookContext();

  const setSelectedBook = (book) => {
    dispatch({ type: "SET_SELECTED_BOOK", payload: book });
  };

    const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null;

    return (
        <div 
            onClick={() => setSelectedBook(book)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group flex flex-col"
        >
            <div className="relative h-64 bg-gray-100 flex items-center justify-center">
                {coverUrl ? (
                    <img 
                        src={coverUrl} 
                        alt={`Cover of ${book.title}`} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                    />
                ) : null}
                <div className={`h-full w-full flex-col items-center justify-center text-center p-4 text-gray-500 ${coverUrl ? 'hidden' : 'flex'}`}>
                     <BookIcon />
                     <span className="mt-2 text-sm font-semibold">{book.title}</span>
                </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-gray-800 text-lg truncate" title={book.title}>
                        {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                        {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                    </p>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    First Published: {book.first_publish_year || 'N/A'}
                </p>
            </div>
        </div>
    );
};
export default BookCard;