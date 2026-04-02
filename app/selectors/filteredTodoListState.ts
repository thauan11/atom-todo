import { selector } from "recoil";
import { todoListState } from "~/atom/todoListState";
import { todoListFilterState } from "~/atom/todoListFilterState";
import { selectedCollectionState } from "~/atom/selectedCollectionState";

export const filteredTodoListState = selector({
  key: 'FilteredTodoList',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const selectedCollection = get(selectedCollectionState);
    const list = get(todoListState).filter((item) => item.collectionId === selectedCollection?.id);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});