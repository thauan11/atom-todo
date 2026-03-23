import { useSetRecoilState } from "recoil";
import { todoListState } from "~/atom/todoListState";
import styles from "./TodoItem.module.css";
import { LuTrash2 } from "react-icons/lu";


export function TodoItem({ item }: { item: TodoItemType }) {
  const setTodoList = useSetRecoilState(todoListState);

  const setItemIsComplete = (id: number) => {
    setTodoList((oldTodoList) => {
      return oldTodoList.map((todoItem) => {
        if (todoItem.id === id) {
          return {
            ...todoItem,
            isComplete: !todoItem.isComplete,
          };
        }
        return todoItem;
      });
    });
  };

  const deleteItem = (id: number) => {
    setTodoList((oldTodoList) => {
      return oldTodoList.filter((todoItem) => todoItem.id !== id);
    });
  };
  
  return (
    <div key={item.id} className={styles.todoItem}>
      <div>
        <input
          type="checkbox"
          checked={item.isComplete}
          onChange={() => setItemIsComplete(item.id)}
          id={item.id.toString()}
        />
        <label htmlFor={item.id.toString()}>{item.text}</label>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => deleteItem(item.id)} className={styles.deleteButton}>
          <LuTrash2 />
        </button>
      </div>
    </div>
  );
}
