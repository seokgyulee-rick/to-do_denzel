import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { useState, useRef, useCallback, useReducer } from 'react';
import { arrayBufferEquality } from '../../../../Library/Caches/typescript/4.7/node_modules/@jest/expect-utils/build/index';

function creatBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새로 추가
      // {type : 'INSERT', todo : {id:1, text: 'todo', checked: false} }
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': // 토글
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState(creatBulkTodos);
  const [todos, dispatch] = useReducer(todoReducer, undefined, creatBulkTodos);

  const test = [
    { id: 1, checked: true },
    { id: 2, checked: true },
  ];
  const nextTests = [...test];
  nextTests[0].checked = false;

  console.log(test[0] === nextTests[0]);
  // console.log(nextTests[0]);

  nextTests[0] = {
    ...test[0],
    checked: false,
  };
  console.log(test[0] === nextTests[0]);
  console.log(test[0] == nextTests[0]);

  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  // const onInsert = useCallback(
  //   (text) => {
  //     const todo = {
  //       id: nextId.current,
  //       text,
  //       checked: false,
  //     };
  //     // setTodos(todos.concat(todo));
  //     setTodos((todos) => todos.concat(todo));
  //     nextId.current += 1;
  //   },
  //   // [todos],
  //   [],
  // );
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      // setTodos(todos.concat(todo));
      // setTodos((todos) => todos.concat(todo));
      dispatch({ type: 'INSERT', todo });
      nextId.current += 1;
    },
    // [todos],
    [],
  );

  const onRemove = useCallback(
    (id) => {
      // setTodos(todos.filter((todo) => todo.id !== id));
      // setTodos((todos) => todos.filter((todo) => todo.id !== id));
      dispatch({ type: 'REMOVE', id });
    },
    // [todos],
    [],
  );
  const onToggle = useCallback(
    (id) => {
      // setTodos(
      //   todos.map((todo) =>
      //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      //   ),
      // );
      // setTodos((todos) =>
      //   todos.map((todo) =>
      //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      //   ),
      // );
      dispatch({ type: 'TOGGLE', id });
    },
    // [todos],
    [],
  );
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
