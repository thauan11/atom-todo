import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { collectionsState } from "~/atom/collectionsState";
import { LuSave } from "react-icons/lu";
import { CollectionIcon } from "../CollectionIcon/CollectionIcon";
import styles from "./CollectionCreator.module.css";
import { Modal } from "../Modal/Modal";

const createUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function CollectionCreator() {
  const [inputValue, setInputValue] = useState('');
  const setCollections = useSetRecoilState(collectionsState);
  const collections = useRecoilValue(collectionsState);
  const [collectionIcon, setCollectionIcon] = useState('LuSave');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [color, setColor] = useState('#fff');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newList = [...collections, {
      id: createUuid(),
      text: inputValue,
      color: color,
      icon: collectionIcon,
      isComplete: false,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }];
    
    setCollections(newList);
    setInputValue('');
    setCollectionIcon('LuSave');
    setColor('#fff');
  };

  const handleIconChange = (icon: string) => {
    setCollectionIcon(icon);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.collectionCreator}>
      <h3>Create Collection</h3>
      <form onSubmit={addItem} className={styles.form}>
        <div>
          <button type="button" className={styles.iconButton} onClick={() => setIsModalOpen(true)}>
            <CollectionIcon icon={collectionIcon} size={"md"} />
          </button>

          <Modal toggle={() => setIsModalOpen(false)} open={isModalOpen}>
            <div className={styles.iconList}>
              <button type="button" onClick={() => handleIconChange("LuSave")}>
                <CollectionIcon icon="LuSave" size={"md"} />
              </button>
              <button type="button" onClick={() => handleIconChange("LuAppWindow")}>
                <CollectionIcon icon="LuAppWindow" size={"md"} />
              </button>
              <button type="button" onClick={() => handleIconChange("LuAlarmClock")}>
                <CollectionIcon icon="LuAlarmClock" size={"md"} />
              </button>
              <button type="button" onClick={() => handleIconChange("LuAlbum")}>
                <CollectionIcon icon="LuAlbum" size={"md"} />
              </button>
              <button type="button" onClick={() => handleIconChange("LuArchive")}>
                <CollectionIcon icon="LuArchive" size={"md"} />
              </button>
              <button type="button" onClick={() => handleIconChange("LuBackpack")}>
                <CollectionIcon icon="LuBackpack" size={"md"} />
              </button>
              <button type="button" onClick={() => handleIconChange("LuBaggageClaim")}>
                <CollectionIcon icon="LuBaggageClaim" size={"md"} />
              </button>
              <button type="button" onClick={() => handleIconChange("LuBeef")}>
                <CollectionIcon icon="LuBeef" size={"md"} />
              </button>
              <button type="button" onClick={() => handleIconChange("LuCar")}>
                <CollectionIcon icon="LuCar" size={"md"} />
              </button>
              <button type="button" onClick={() => handleIconChange("LuCat")}>
                <CollectionIcon icon="LuCat" size={"md"} />
              </button>
            </div>
          </Modal>
        </div>

        <div>
          {/* <label htmlFor="colorPicker">Main color:</label> */}
          <input
            type="color"
            id="colorPicker"
            name="colorPicker"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
              width: '100%',
            }}
          />

          <button
            type="submit"
            onSubmit={addItem}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            <LuSave />
          </button>
        </div>
      </form>
    </div>
  );
}