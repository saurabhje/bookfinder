import { useBookContext } from "../context/BookContext";
import { useEffect } from "react";
import { XIcon } from "../icons/Xicon";
import { BookIcon } from "../icons/BookIcon";

const BookDetailModal = () => {
    const { state, dispatch } = useBookContext();
    const { selectedBook } = state;

    const setSelectedBook = (book) => {
        dispatch({ type: "SET_SELECTED_BOOK", payload: book });
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setSelectedBook(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setSelectedBook]);

    if (!selectedBook) return null;
    
    const coverUrl = selectedBook.cover_i ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg` : null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={() => setSelectedBook(null)}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="w-full md:w-1/3 h-80 md:h-auto bg-gray-100 flex-shrink-0">
                    {coverUrl ? (
                         <img src={coverUrl} alt={`Cover of ${selectedBook.title}`} className="w-full h-full object-cover"/>
                    ) : (
                        <div className="h-full w-full flex flex-col items-center justify-center text-center p-4 text-gray-500">
                             <BookIcon />
                             <span className="mt-2 text-sm font-semibold">No Cover Available</span>
                        </div>
                    )}
                </div>
                <div className="p-6 md:p-8 flex-grow overflow-y-auto">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedBook.title}</h2>
                         <button onClick={() => setSelectedBook(null)} className="text-gray-500 hover:text-gray-800 p-1 rounded-full -mt-2 -mr-2">
                             <XIcon />
                         </button>
                    </div>
                    <p className="text-lg text-gray-600 mb-4">by {selectedBook.author_name?.join(', ') || 'Unknown Author'}</p>
                    
                    <div className="space-y-3 text-gray-700">
                        <p><span className="font-semibold">First Published:</span> {selectedBook.first_publish_year || 'N/A'}</p>
                        <p><span className="font-semibold">Publisher:</span> {selectedBook.publisher?.[0] || 'N/A'}</p>
                        <p><span className="font-semibold">Number of Pages:</span> {selectedBook.number_of_pages_median || 'N/A'}</p>
                        <p><span className="font-semibold">Subjects:</span> {selectedBook.subject?.slice(0, 5).join(', ') || 'N/A'}</p>
                        <p><span className="font-semibold">ISBN:</span> {selectedBook.isbn?.[0] || 'N/A'}</p>
                    </div>

                    <a
                        href={`https://openlibrary.org${selectedBook.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        View on Open Library
                    </a>
                </div>
            </div>
        </div>
    );
};
export default BookDetailModal;