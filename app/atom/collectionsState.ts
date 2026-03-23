import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

export const collectionsState = atom<CollectionsType[]>({
  key: 'Collections',
  default: [],
  effects_UNSTABLE: [persistAtom], 
});
