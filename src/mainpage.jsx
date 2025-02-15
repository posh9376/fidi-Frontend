
import TodoList from "./todoList"


let name = localStorage.getItem("name") || "Guest";
console.log(name);


function Mainpage() {
    
    return (
        <div>
            
            <h3>Welcome {name}</h3>
            <p>Today&apos;S Tasks</p>
            <TodoList />
        </div>
    )
}

export default Mainpage