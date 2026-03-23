import type { Route } from "./+types/home";
import { TodoList } from "~/components/TodoList/TodoList";
import { CollectionCreator } from "~/components/CollectionCreator/CollectionCreator";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ATOM Taskie" },
    { name: "description", content: "Taskie" },
  ];
}

export default function Home() {
  return (
    <main style={{ 
      width: "100%",
      maxWidth: "450px",
      padding: "1rem",
      margin: "0 auto",
    }}>
      <TodoList />
    </main>
  );
}
