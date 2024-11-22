import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useCreteWorkspaceModal = () => {
  return useAtom(modalState);
};
