import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListitem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );
  return (
    <List
      className="TodoList"
      width={512} //전체크기
      height={513} // 전체 높이
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: 'none' }}
    />
  );
  // return (
  //   <div className="TodoList">
  //     {todos.map((todo) => (
  //       <TodoListItem
  //         key={todo.id}
  //         todo={todo}
  //         onRemove={onRemove}
  //         onToggle={onToggle}
  //       />
  //     ))}
  //   </div>
  // );
};

export default React.memo(TodoList);
