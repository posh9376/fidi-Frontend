/* eslint-disable react/prop-types */
function Notes({text, handleDelete}) {
    let jina = localStorage.getItem("name");
    return (
        <div className="mb-4">
            <li className="list-item d-flex justify-content-between ">
                <p className="ms-2 mt-2">{jina.toUpperCase()}, {text}</p>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </li>
        </div>
    )
}

export default Notes