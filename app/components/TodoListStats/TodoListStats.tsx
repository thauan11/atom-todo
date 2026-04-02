import { useRecoilValue } from "recoil";
import { todoListStatsState } from "~/selectors/todoListStatsState";
import styles from "./TodoListStats.module.css";
import type React from "react";


export function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  return (
    <aside className={styles.statsMonitor}>
      <h1>Status Monitor</h1>

      <div
        className={styles.mainStats}
        style={{ "--percent": Math.round(percentCompleted) } as React.CSSProperties}
      >
        <p>{Math.round(percentCompleted)}%</p>
      </div>

      <div className={styles.subStats}>
        <div className={styles.subItem}>
          <p>Total</p>
          <p>{totalNum}</p>
        </div>
        
        <div className={styles.subItem}>
          <p>Completed</p>
          <p>{totalCompletedNum}</p>
        </div>
      </div>
    </aside>
  );
}