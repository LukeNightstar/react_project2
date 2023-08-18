// useReducer 실습 파일
// 상태 변화 코드를 분리를 위해서는 useReducer를 사용
// 하나의 컴포넌트 안에 너무 많은 상태 변화 코드는 유지보수를 어렵게 한다

import {useReducer} from "react";

function reducer(state, action) {
    switch (action.type) {
        case "INCREASE":
            return state + action.data;
        case "DECREASE":
            return state - action.data;
        case "INIT":
            return 0;
        default:
            return state;
    }
}

function TestComp() {

    const [count, dispatch] = useReducer(reducer, 0);

    return (
        <div>
            <h4>테스트 컴포턴트</h4>
            <div>
                <bold>{count}</bold>
            </div>
            <div>
                <button onClick={() => dispatch({type: "INCREASE", data: 1})}>+</button>
                <button onClick={() => dispatch({type: "DECREASE", data: 1})}>-</button>
                <button onClick={() => dispatch({type: "INIT"})}>0으로 초기화</button>
            </div>
        </div>
    )
}

export default TestComp;