import './App.css';
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import {useRef, useState} from "react";

const mockTodo = [
    {
        id: 0,
        isDone: false,
        content: "React 공부하기",
        createdDate: new Date().getTime()
    },
    {
        id: 1,
        isDone: false,
        content: "test 2",
        createdDate: new Date().getTime()
    },
    {
        id: 2,
        isDone: false,
        content: "test 3",
        createdDate: new Date().getTime()
    }

];

function App() {

    const idRef = useRef(3);
    const [todo, setTodo] = useState(mockTodo);

    const onCreate = (content) => {
        const newItem = {
            id: idRef.current,
            content,
            isDone: false,
            createdDate: new Date().getTime()
        };
        setTodo([newItem, ...todo]);
        idRef.current += 1;
    };

    return (
        <div className="App">
            <h2>Hello React</h2>
            <Header/>
            <TodoEditor onCreate={onCreate}/>
            <TodoList todo={todo}/>
        </div>
    );
}

export default App;
