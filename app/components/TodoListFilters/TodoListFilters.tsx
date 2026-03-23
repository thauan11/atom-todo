import { useRecoilState } from "recoil";
import { todoListFilterState } from "~/selectors/todoListFilterState";
import styles from "./TodoListFilters.module.css";


export function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(value);
  };

  return (
    <section className={styles.filters}>
      <p>Filter:</p>
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </section>
  );
}