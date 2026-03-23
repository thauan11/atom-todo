import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "~/atom/todoListState";
import { LuSave } from "react-icons/lu";


export function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);
  const todoList = useRecoilValue(todoListState);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newList = [...todoList, { id: Date.now(), text: inputValue, isComplete: false }];
    setTodoList(newList);
    localStorage.setItem('todoList', JSON.stringify(newList));
    setInputValue('');
  };

  return (
    <div>
      <form onSubmit={addItem} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none',
            width: '100%',
          }}
        />
        <button
          type="submit"
          onSubmit={addItem}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          <LuSave />
        </button>
      </form>
    </div>
  );
}