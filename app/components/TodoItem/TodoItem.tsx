import { useSetRecoilState } from "recoil";
import { todoListState } from "~/atom/todoListState";
import styles from "./TodoItem.module.css";
import { LuCalendarDays, LuCalendarCheck, LuCheck } from "react-icons/lu";


export function TodoItem({ item }: { item: TodoItemType }) {
  const setTodoList = useSetRecoilState(todoListState);

  const setItemIsComplete = (id: number) => {
    setTodoList((oldTodoList) => {
      return oldTodoList.map((todoItem) => {
        if (todoItem.id === id) {
          return {
            ...todoItem,
            isComplete: !todoItem.isComplete,
            updatedAt: new Date(),
          };
        }
        return todoItem;
      });
    });
  };

  const formattedDate = (data: Date) => {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  
  return (
    <li key={item.id} className={styles.todoItem}>
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={() => setItemIsComplete(item.id)}
        id={item.id.toString()}
      />
      <label htmlFor={item.id.toString()}>
        {item.isComplete && <div className={styles.checkIcon}><LuCheck /></div>}
        {item.text}
      </label>

      {item.isComplete ? (
        <div className={styles.floatContent}>
          <span><LuCalendarCheck /> {item.updatedAt ? formattedDate(item.updatedAt) : "N/A"}</span>
        </div>
      ) : (
        <div className={styles.floatContent}>
          <span><LuCalendarDays /> {formattedDate(item.createdAt)}</span>
        </div>
      )}
    </li>
  );
}
