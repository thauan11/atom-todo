interface CollectionsType {
  id: string;
  text: string;
  color: string;
  icon: string;
  isComplete: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt?: string;
  lists?: TodoItemType[];
}