import { useBookContext } from "../context/BookContext";

const Pagination = () => {
    const { state, dispatch } = useBookContext();

    const { totalResults, currentPage, isLoading } = state;
    const limit = 18;
    const totalPages = Math.ceil(totalResults / limit);

    if (isLoading || totalPages <= 1) return null;

    const setCurrentPage = (page) => {
        dispatch({ type: "SET_PAGE", payload: page });
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };
    
    const pages = [];
    // Logic to show a limited number of page buttons (e.g., first, last, current, and neighbors)
    const pageLimit = 5;
    let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    let endPage = Math.min(totalPages, startPage + pageLimit - 1);
    
    if (endPage - startPage + 1 < pageLimit) {
        startPage = Math.max(1, endPage - pageLimit + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-10">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Prev
            </button>
            {startPage > 1 && (
                <>
                    <button onClick={() => handlePageChange(1)} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">1</button>
                    {startPage > 2 && <span className="px-4 py-2 text-gray-500">...</span>}
                </>
            )}

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 border rounded-md ${currentPage === page ? 'bg-pink-600 text-white border-pink-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                 <>
                    {endPage < totalPages - 1 && <span className="px-4 py-2 text-gray-500">...</span>}
                    <button onClick={() => handlePageChange(totalPages)} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">{totalPages}</button>
                </>
            )}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;