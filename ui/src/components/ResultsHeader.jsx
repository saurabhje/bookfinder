import { useBookContext } from "../context/BookContext";

const ResultsHeader = () => {
    const { state } = useBookContext();
  const { totalResults, query, isLoading } = state;
    
    if (isLoading || !query) return null;

    return (
        <div className="text-center my-4">
             <p className="text-gray-600">
                Found <span className="font-bold text-pink-600">{totalResults.toLocaleString()}</span> results for <span className="font-bold text-gray-800">"{query}"</span>.
            </p>
        </div>
    );
};
export default ResultsHeader;