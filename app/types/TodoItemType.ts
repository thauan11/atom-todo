interface TodoItemType {
  id: number;
  text: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt?: Date;
  completedAt?: Date;
  collectionId: string;
}