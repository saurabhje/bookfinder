import { useBookContext } from "../context/BookContext";
import BookCard from "./BookCard";
import Loader from "./Loader";
import { BookIcon } from "../icons/BookIcon";
const BookList = () => {
    const { state } = useBookContext();

    const { books, isLoading, error, query } = state;

    if (error) {
        return <p className="text-center text-red-500 col-span-full mt-10">{error}</p>;
    }

    if (!isLoading && books.length === 0) {
        return (
            <div className="text-center py-16 col-span-full">
                <BookIcon />
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                    {query ? 'No Books Found' : 'Start Your Search'}
                </h2>
                <p className="mt-2 text-gray-500">
                    {query ? `We couldn't find any books matching your search. Try a different query.` : `Use the search bar above to find your next great read.`}
                </p>
            </div>
        );
    }

    return (
        <>
            {isLoading ? <Loader /> : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {books.map((book) => (
                        <BookCard key={book.key} book={book} />
                    ))}
                </div>
            )}
        </>
    );
};
export default BookList;