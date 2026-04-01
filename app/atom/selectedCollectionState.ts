import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

export const selectedCollectionState = atom<SelectedCollectionType | null>({
  key: 'collectionSelected',
  default: null,
  // effects_UNSTABLE: [persistAtom], 
});
