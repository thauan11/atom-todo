import { useEffect, useState } from "react";
import { CollectionCreator } from "../CollectionCreator/CollectionCreator";
import { CollectionList } from "../CollectionList/CollectionList";

export function Collections() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <div>
      <CollectionCreator />
      <CollectionList />
    </div>
  );
}