import "./TodoList.css";
import TodoItem from "./TodoItem";
import {useState} from "react";

const TodoList = ({todo, onUpdate, onDelete}) => {

    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    // 할 일 아이템 필터링 기능
    const getSearchResult = () => {
        return search === ""
            ? todo : todo.filter((it) =>
                it.content.toLowerCase().includes(search.toLowerCase()));
    };

    // Memoization
    const analyzeTodo = () => {
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    };

    const {totalCount, doneCount, notDoneCount} = analyzeTodo();

    return (
        <div className="TodoList">
            <h4>Todo List</h4>
            <div>
                <div>총개수 : {totalCount}</div>
                <div>완료된 할 일 : {doneCount}</div>
                <div>아직 완료되지 않은 일 : {notDoneCount}</div>
            </div>
            <input
                value={search}
                onChange={onChangeSearch}
                className="searchbar" placeholder="검색어를 입력하세요"/>
            <div className={"list_wrapper"}>
                {getSearchResult().map((it) => (
                    <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
                ))}
            </div>
        </div>
    );
};

export default TodoList;