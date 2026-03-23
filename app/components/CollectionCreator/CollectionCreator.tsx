import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { collectionsState } from "~/atom/collectionsState";
import { LuSave } from "react-icons/lu";

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

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newList = [...collections, {
      id: createUuid(),
      text: inputValue,
      color: '#fff',
      icon: '',
      isComplete: false,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }];
    
    setCollections(newList);
    setInputValue('');
  };

  return (
    <div>
      <form onSubmit={addItem} style={{ display: 'flex', gap: '10px' }}>
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
      </form>
    </div>
  );
}