import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import "./App.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  function handleTodos() {
    if (!newTitle || !newDescription) {
      alert("Title or description is empty. Cannot submit.");
      return;
    }
    let todos = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(todos);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  }

  function handleTodoDelete(index) {
    let reducedTodoArr = [...allTodos];
    reducedTodoArr.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodoArr));
    setAllTodos(reducedTodoArr);
  }

  function handleCompletedTodoDelete(index) {
    let reducedTodoArr = [...completedTodos];
    reducedTodoArr.splice(index, 1);
    localStorage.setItem("completedtodolist", JSON.stringify(reducedTodoArr));
    setCompletedTodos(reducedTodoArr);
  }

  function deleteAllCompleted() {
    let arr = [...completedTodos];
    arr = arr.filter((todo) => !todo);
    localStorage.setItem("completedtodolist", JSON.stringify(arr));
    setCompletedTodos(arr);
  }

  function handleComplete(index) {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let copmletedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    let filteredItem = {
      ...allTodos[index],
      copmletedOn: copmletedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleTodoDelete(index);
    localStorage.setItem(
      "completedtodolist",
      JSON.stringify(updatedCompletedArr)
    );
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(
      localStorage.getItem("completedtodolist")
    );
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);
  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <form className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              type="text"
              placeholder="Task title"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              type="text"
              placeholder="Task description"
            />
          </div>
          <div className="todo-input-item">
            <button onClick={handleTodos} className="primaryBtn">
              Add
            </button>
          </div>
        </form>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
          {isCompleteScreen && completedTodos.length > 0 && (
            <button className="delete" onClick={deleteAllCompleted}>
              Delete all Completed
            </button>
          )}
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      title="Delete"
                      className="icon"
                      onClick={() => handleTodoDelete(index)}
                    />
                    <BsCheckLg
                      title="Mark as complete"
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                    />
                  </div>
                </div>
              );
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <>
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>
                        <small>Completed on :{item.copmletedOn}</small>
                      </p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleCompletedTodoDelete(index)}
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
