import { useSetRecoilState } from "recoil";
import { todoListState } from "~/atom/todoListState";
import { LuTrash2 } from "react-icons/lu";
import styles from "./TodoItemDelete.module.css";


interface TodoItemProps {
  item: TodoItemType;
  handleChange: () => void;
}

export function TodoItemDelete({ item, handleChange }: TodoItemProps) {
  const setTodoList = useSetRecoilState(todoListState);

  const deleteItem = () => {
    setTodoList((oldTodoList) => oldTodoList.filter((todoItem) => todoItem.id !== item.id));
    handleChange();
  };
  
  return (
    <button type="button" key={item.id} onClick={deleteItem} className={styles.todoItemDelete}>
      <LuTrash2 />
    </button>
  );
}
