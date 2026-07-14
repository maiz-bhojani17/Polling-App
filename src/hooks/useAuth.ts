import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const usePolls = () => {
  return useSelector((state: RootState) => state.poll.polls);
};