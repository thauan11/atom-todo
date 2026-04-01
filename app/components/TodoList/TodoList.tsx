import { useRecoilValue } from "recoil";
import { todoListState } from "~/atom/todoListState";
import { TodoItem } from "../TodoItem/TodoItem";
import { useEffect, useState } from "react";
import { TodoItemCreator } from "../TodoItemCreator/TodoItemCreator";
import { TodoListFilters } from "../TodoListFilters/TodoListFilters";
import { TodoListStats } from "../TodoListStats/TodoListStats";
import { filteredTodoListState } from "~/selectors/filteredTodoListState";
import { selectedCollectionState } from "~/atom/selectedCollectionState";

export function TodoList() {
  const [isMounted, setIsMounted] = useState(false);
  // const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);
  const collectionSelected = useRecoilValue(selectedCollectionState);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "2rem"}}>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {todoList.filter((item) => item.collectionId === collectionSelected?.id).map((todoItem) => (
          <TodoItem key={todoItem.id} item={todoItem} />
        ))}
      </div>
    </section>
  );
}