import type { Route } from "./+types/home";
import { TodoList } from "~/components/TodoList/TodoList";
import { Collections } from "~/components/Collections/Collections";
import { selectedCollectionState } from "~/atom/selectedCollectionState";
import { useRecoilValue } from "recoil";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ATOM Taskie" },
    { name: "description", content: "Taskie" },
  ];
}

export default function Home() {
  const selectedCollection = useRecoilValue(selectedCollectionState);

  return (
    <main style={{ padding: "2rem" }}>
      {selectedCollection ? (
        <TodoList />
      ) : (
        <Collections />
      )}
    </main>
  );
}
