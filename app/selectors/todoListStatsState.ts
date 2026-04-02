import { selector } from "recoil";
import { todoListState } from "~/atom/todoListState";
import { selectedCollectionState } from "~/atom/selectedCollectionState";

export const todoListStatsState = selector({
  key: 'TodoListStats',
  get: ({get}) => {
    const collectionSelected = get(selectedCollectionState);
    const todoList = get(todoListState).filter((item) => {
      return item.collectionId === collectionSelected?.id;
    });
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});