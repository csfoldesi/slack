import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useCreteChannelModal = () => {
  return useAtom(modalState);
};
