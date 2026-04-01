import { useRecoilValue } from "recoil";
import { todoListState } from "~/atom/todoListState";
import { TodoItem } from "../TodoItem/TodoItem";
import { useEffect, useState } from "react";
import { TodoItemCreator } from "../TodoItemCreator/TodoItemCreator";
import { TodoListFilters } from "../TodoListFilters/TodoListFilters";
import { TodoListStats } from "../TodoListStats/TodoListStats";
import { filteredTodoListState } from "~/selectors/filteredTodoListState";
import { selectedCollectionState } from "~/atom/selectedCollectionState";
import styles from "./TodoList.module.css";

export function TodoList() {
  const [isMounted, setIsMounted] = useState(false);
  // const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);
  const collectionSelected = useRecoilValue(selectedCollectionState);

  const hasCompletedItems = todoList.some((item) => item.isComplete);
  const hasPendingItems = todoList.some((item) => !item.isComplete);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <section className={styles.section}>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      {/* <TodoItemCreator /> */}

      {/* <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {todoList.filter((item) => item.collectionId === collectionSelected?.id).map((todoItem) => (
          <TodoItem key={todoItem.id} item={todoItem} />
        ))}
      </div> */}

      <div className={styles.container}>
        <div className={styles.leftContent}>
          <div className={styles.statusMonitor}>
            <TodoListStats />
          </div>

          <div className={styles.newTodo}>
            <TodoItemCreator /> 
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.todoHeader}>
            <h1>{hasPendingItems ? "Pending" : "Completed"}</h1>
            <TodoListFilters />
          </div>

          <ul className={styles.todoItems}>
            {todoList
              .filter((item) => item.collectionId === collectionSelected?.id)
              .filter((item) => item.isComplete === false)
              .map((todoItem) => 
            (
              <TodoItem key={todoItem.id} item={todoItem} />
            ))}
          </ul>

          {hasCompletedItems &&
            <div className={styles.completedItems}>
              {hasPendingItems && <h1>Completed</h1>}
              <ul>
                {todoList
                  .filter((item) => item.collectionId === collectionSelected?.id)
                  .filter((item) => item.isComplete === true)
                  .map((todoItem) => 
                (
                  <TodoItem key={todoItem.id} item={todoItem} />
                ))}
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  );
}