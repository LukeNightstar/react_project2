import './App.css';
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import React, {useCallback, useMemo, useReducer, useRef} from "react";
import TestComp from "./component/TestComp";

// https://wikidocs.net/book/6507

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
        content: "react test 2",
        createdDate: new Date().getTime()
    },
    {
        id: 2,
        isDone: false,
        content: "test 3",
        createdDate: new Date().getTime()
    }

];

function reducer(state, action) {
    // 상태 변화 코드
    switch (action.type) {
        case "CREATE": {
            return [action.newItem, ...state];
        }
        case "UPDATE": {
            return state.map((it) =>
                it.id === action.targetId ? {
                    ...it, isDone: !it.isDone,
                } : it
            );
        }
        case "DELETE": {
            return state.filter((it) => it.id !== action.targetId);
        }
        default:
            return state;
    }
}

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function App() {

    const [todo, dispatch] = useReducer(reducer, mockTodo);
    const idRef = useRef(3);

    // create
    const onCreate = (content) => {
        dispatch({
            type: "CREATE",
            newItem: {
                id: idRef.current,
                content,
                isDone: false,
                createdDate: new Date().getTime(),
            },
        });
        idRef.current += 1;
    };

    // update
    const onUpdate = useCallback((targetId) => {
        dispatch({
            type: "UPDATE",
            targetId,
        });
    }, []);

    // delete
    const onDelete = useCallback((targetId) => {
        dispatch({
            type: "DELETE",
            targetId,
        });
    }, []);

    // 기능 최하단에 위치해야함 아니면 오류 발생
    const memoizedDispatches = useMemo(() => {
        return { onCreate, onUpdate, onDelete };
    }, []);

    return (
        <div className="App">
            <h2>Hello React</h2>
            <TestComp/>
            <Header/>
            <TodoStateContext.Provider value={todo}>
                <TodoDispatchContext.Provider value={memoizedDispatches}>
                    <TodoEditor/>
                    <TodoList/>
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </div>
    );
}

export default App;
