import { useRecoilValue } from "recoil";
import { todoListStatsState } from "~/selectors/todoListStatsState";
import styles from "./TodoListStats.module.css";


export function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const completedPercent = totalNum === 0 ? 0 : Math.round(percentCompleted);
  const uncompletedPercent = totalNum === 0 ? 0 : Math.round(100 - percentCompleted);

  const completedColor = () => {
    if (completedPercent >= 90) return "#4caf50"; // verde 
    if (completedPercent >= 50) return "#ffff4c"; // amarelo
    return "#ff4343"; // vermelho
  }

  const uncompletedColor = () => {
    if (uncompletedPercent >= 90) return "#ff4343"; // vermelho
    if (uncompletedPercent >= 50) return "#ffff4c"; // amarelo
    return "#4caf50"; // verde
  }

  return (
    <>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <p>To do</p>
          <div
            className={styles.progressCircle}
            style={{ "--percent": uncompletedPercent, "--main-color": uncompletedColor() } as React.CSSProperties}
          >
            <p className={styles.number}>{totalUncompletedNum}</p>
            <p className={styles.numberPercent}>{uncompletedPercent}%</p>
          </div>
        </div>

        <div className={styles.statItem}>
          <p>Completed</p>
          <div
            className={styles.progressCircle}
            style={{ "--percent": completedPercent, "--main-color": completedColor() } as React.CSSProperties}
          >
            <p className={styles.number}>{totalCompletedNum}</p>
            <p className={styles.numberPercent}>{completedPercent}%</p>
          </div>
        </div>
      </div>
    </>
  );
}