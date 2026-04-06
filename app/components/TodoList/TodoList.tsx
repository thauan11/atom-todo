import { useRecoilValue, useSetRecoilState } from "recoil";
import { TodoItem } from "../TodoItem/TodoItem";
import { useEffect, useRef, useState } from "react";
import { TodoListFilters } from "../TodoListFilters/TodoListFilters";
import { TodoListStats } from "../TodoListStats/TodoListStats";
import { todoListState } from "~/atom/todoListState";
import { filteredTodoListState } from "~/selectors/filteredTodoListState";
import { selectedCollectionState } from "~/atom/selectedCollectionState";
import { collectionsState } from "~/atom/collectionsState";
import { LuBrush, LuCalendarDays, LuChevronLeft, LuPlus } from "react-icons/lu";
import styles from "./TodoList.module.css";
import { TodoItemDelete } from "../TodoItemDelete/TodoItemDelete";

export function TodoList() {
  const [isMounted, setIsMounted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isClosing, setIsClosing] = useState(undefined as boolean | undefined);
  const [inputValue, setInputValue] = useState('');
  const newTodoRef = useRef(null as HTMLInputElement | null);
  const todoList = useRecoilValue(filteredTodoListState);
  const setTodoList = useSetRecoilState(todoListState);
  const selectedCollection = useRecoilValue(selectedCollectionState);
  const setSelectedCollection = useSetRecoilState(selectedCollectionState);
  const allCollections = useRecoilValue(collectionsState);
  const setAllCollections = useSetRecoilState(collectionsState);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }
  
  // helpers
  const createId = () => {
    let id = 0;
    todoList.forEach((item) => {
      if (item.id > id) {
        id = item.id;
      }
    });
    return id + 1;
  };

  const closeEdit = () => {
    if (!isEditing) return setIsEditing(!isEditing);
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    setIsClosing(true);
    setIsEditing(false);
    sleep(300).then(() => {
      setIsClosing(false);
    });
  };

  // handlers
  const handleTodoItemChange = () => {
    const collection = allCollections.find((col) => col.id === selectedCollection?.id);
    if (collection) {
      const noItems = todoList.some((item) => item.collectionId === collection?.id);
      if (noItems) {
        setIsEditing(false);
        setIsClosing(false);
      }

      const updatedCollection = {
        ...collection,
        updatedAt: new Date().toDateString(),
      };
      setSelectedCollection(updatedCollection);
      setAllCollections((prevCollections) =>
        prevCollections.map((col) =>
          col.id === updatedCollection.id ? updatedCollection : col
        )
      );
    }
  }

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue === '') {
      setInputValue('');
      setIsAdding(false);
      return;
    };
    
    const newList = [...todoList, {
      id: createId(),
      text: inputValue,
      isComplete: false,
      createdAt: new Date(),
      collectionId: selectedCollection?.id ?? '',
    }];
    
    setTodoList(newList);
    setInputValue('');
    setIsAdding(false);
    handleTodoItemChange();
  };

  // renders
  const renderAddTodoItem = () => {
    if (!isAdding) return null;
    setTimeout(() => newTodoRef.current?.focus(), 0);
    return (
      <form onSubmit={addItem} className={styles.form}>
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          ref={newTodoRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={addItem}
        />

        <p>
          <span><LuCalendarDays size={16} /></span>
          <span>
            {new Date().toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </p>
      </form>
    );
  };

  const hasCompletedItems = todoList.some((item) => item.isComplete);
  const hasPendingItems = todoList.some((item) => !item.isComplete);
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <div className={styles.sticky}>
            <div className={styles.collectionHeader}>
              <button type="button" onClick={() => setSelectedCollection(null)}>
                <LuChevronLeft size={20} />
                <span>Back</span>
              </button>
            </div>

            <div className={styles.statusMonitor}>
              <TodoListStats />
            </div>

            <div className={styles.newTodo}>
              <button
                type="button"
                disabled={isEditing}
                onClick={() => setIsAdding(!isAdding)}
              >
                <LuPlus size={20} />
              </button>

              <button
                type="button"
                disabled={todoList.length === 0}
                onClick={() => closeEdit()}
              >
                <LuBrush size={20} />
              </button>
            </div>
          </div>
        </div>

        {todoList.length === 0 ? (
          <div className={styles.rightContent}>
            { renderAddTodoItem() }
          </div>
        ) : (
          <div className={styles.rightContent}>
            <div className={styles.todoHeader}>
              <h1>{hasPendingItems ? "Pending" : "Completed"}</h1>
              <TodoListFilters />
            </div>

            {isEditing || isClosing ? (
              <div className={styles.todoItems}>
                <div className={styles.container}>
                  {todoList.filter((item) => item.isComplete === false).map((todoItem) => (
                    <div
                      key={todoItem.id}
                      className={isClosing ? styles.removeItemClose : styles.removeItem}
                    >
                      <div>
                        <TodoItemDelete
                          key={todoItem.id}
                          item={todoItem}
                          handleChange={() => handleTodoItemChange()}
                          isClosing={isClosing}
                        />
                      </div>
                      <ul>
                        <TodoItem
                          key={todoItem.id}
                          item={todoItem}
                          handleChange={() => handleTodoItemChange()}
                          isEditing={isEditing}
                        />
                      </ul>
                    </div>
                  ))}
                </div>

                {hasCompletedItems &&
                  <div className={styles.completedItems + " " + styles.todoItems}>
                    {hasPendingItems && <h1>Completed</h1>}
                    <div className={styles.container}>
                      {todoList.filter((item) => item.isComplete === true).map((todoItem) => (
                        <div
                          key={todoItem.id}
                          className={isClosing ? styles.removeItemClose : styles.removeItem}
                        >
                          <div>
                            <TodoItemDelete
                              key={todoItem.id}
                              item={todoItem}
                              handleChange={() => handleTodoItemChange()}
                              isClosing={isClosing}
                            />
                          </div>
                          <ul>
                            <TodoItem
                              key={todoItem.id}
                              item={todoItem}
                              handleChange={() => handleTodoItemChange()}
                              isEditing={isEditing}
                            />
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              </div>
            ) : (
              <>
                <ul className={styles.todoItems}>
                  <div className={styles.container}>
                    {todoList.filter((item) => item.isComplete === false).map((todoItem) => (
                      <TodoItem
                        key={todoItem.id}
                        item={todoItem}
                        handleChange={() => handleTodoItemChange()}
                      />
                    ))}
                  </div>
                </ul>

                { renderAddTodoItem() }

                {hasCompletedItems &&
                  <div className={styles.completedItems}>
                    {hasPendingItems && <h1>Completed</h1>}
                    <ul className={styles.todoItems}>
                      <div className={styles.container}>
                        {todoList.filter((item) => item.isComplete === true).map((todoItem) => (
                          <TodoItem
                            key={todoItem.id}
                            item={todoItem}
                            handleChange={() => handleTodoItemChange()}
                          />
                        ))}
                      </div>
                    </ul>
                  </div>
                }
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}