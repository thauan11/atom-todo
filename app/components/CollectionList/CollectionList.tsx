import { useRecoilValue, useSetRecoilState } from "recoil";
import { collectionsState } from "~/atom/collectionsState";
import { selectedCollectionState } from "~/atom/selectedCollectionState";
import styles from "./CollectionList.module.css";
import { CollectionIcon } from "../CollectionIcon/CollectionIcon";

export function CollectionList() {
  const collections = useRecoilValue(collectionsState);
  const setCollectionSelected = useSetRecoilState(selectedCollectionState);

  return (
    <div>
      <h3>List Collection</h3>
      <section className={styles.collectionList}>
        {collections.map((collection) => (
          <button type="button" key={collection.id} onClick={() => setCollectionSelected(collection)}>
            <CollectionIcon icon={collection.icon} size={"sm"} color={collection.color} />
            <p>{collection.text}</p>
            <p>{collection.isComplete ? "Complete" : "Incomplete"}</p>
            <p>{collection.isArchived ? "Archived" : "Active"}</p>
            <p>{new Date(collection.createdAt).toLocaleString().split(",")[0]}</p>
            <p>{new Date(collection.updatedAt).toLocaleString().split(",")[0]}</p>
          </button>
        ))}
      </section>
    </div>
  );
}