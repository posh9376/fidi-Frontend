/* eslint-disable react/prop-types */
function Notes({ text, handleDelete }) {
    let jina = localStorage.getItem("name");
    return (
        <div className="mb-4 p-2 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-700 text-sm sm:text-base font-medium">{jina.toUpperCase()}, {text}</p>
            <button 
                className="bg-red-500 text-white px-3 py-1 rounded-lg mt-2 sm:mt-0 hover:bg-red-600 transition"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
}

export default Notes;
