import type { Route } from "./+types/home";
import { TodoList } from "~/components/TodoList/TodoList";
import { Collections } from "~/components/Collections/Collections";
import { selectedCollectionState } from "~/atom/selectedCollectionState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ATOM Taskie" },
    { name: "description", content: "Taskie" },
  ];
}

export default function Home() {
  const collectionSelected = useRecoilValue(selectedCollectionState);
  const setCollectionSelected = useSetRecoilState(selectedCollectionState);

  return (
    <main style={{ padding: "2rem" }}>
      {collectionSelected ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingBottom: "1rem" }}>
            <button type="button" onClick={() => setCollectionSelected(null)}>Voltar</button>
            <h1>Collection: {collectionSelected.text}</h1>
          </div>
          <TodoList />
        </>
      ) : (
        <Collections />
      )}
    </main>
  );
}
