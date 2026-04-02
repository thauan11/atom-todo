import { useSetRecoilState } from "recoil";
import { todoListState } from "~/atom/todoListState";
import styles from "./TodoItem.module.css";
import { LuCalendarDays, LuCalendarCheck, LuCheck } from "react-icons/lu";


interface TodoItemProps {
  item: TodoItemType;
  handleChange: () => void;
  isEditing?: boolean;
}

export function TodoItem({ item, handleChange, isEditing }: TodoItemProps) {
  const setTodoList = useSetRecoilState(todoListState);

  const setItemIsComplete = (id: number) => {
    if (isEditing) return;
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
    handleChange();
  };

  const formattedDate = (data: Date) => {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };
  
  return (
    <li key={item.id} className={styles.todoItem} onClick={() => setItemIsComplete(item.id)}>
      <input
        type="checkbox"
        checked={item.isComplete}
        id={item.id.toString()}
        disabled={isEditing}
      />
      <label htmlFor={item.id.toString()}>
        {item.isComplete && <span className={styles.checkIcon}></span>}
        {item.text}
      </label>

      {item.isComplete ? (
        <div className={styles.floatContent}>
          <span><LuCalendarCheck size={16} /></span>
          <span>{item.updatedAt ? formattedDate(item.updatedAt) : "N/A"}</span>
        </div>
      ) : (
        <div className={styles.floatContent}>
          <span><LuCalendarDays size={16} /></span>
          <span>{formattedDate(item.createdAt)}</span>
        </div>
      )}
    </li>
  );
}
