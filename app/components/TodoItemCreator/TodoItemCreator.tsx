import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "~/atom/todoListState";
import { LuSave } from "react-icons/lu";
import { selectedCollectionState } from "~/atom/selectedCollectionState";


export function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const collectionSelected = useRecoilValue(selectedCollectionState);
  const setTodoList = useSetRecoilState(todoListState);
  const todoList = useRecoilValue(todoListState);

  const createId = () => {
    let id = 0;
    todoList.forEach((item) => {
      if (item.id > id) {
        id = item.id;
      }
    });
    return id + 1;
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newList = [...todoList, {
      id: createId(),
      text: inputValue,
      isComplete: false,
      createdAt: new Date(),
      collectionId: collectionSelected ? collectionSelected.id : '',
    }];
    
    setTodoList(newList);
    setInputValue('');
  };

  return (
    <div>
      <h3>Create Todo</h3>
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