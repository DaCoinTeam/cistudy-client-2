import { useReducer } from "react";
import { PostEntity } from "@common";

export interface PostCardState {
  reactPostPartial: PostEntity | null;
}

export interface SetPostsAction {
  type: "SET_REACT_POST_PARTIAL";
  payload: PostEntity;
}

export type PostCardAction = SetPostsAction;

export const state: PostCardState = {
  reactPostPartial: null,
};

export const reducer = (state: PostCardState, action: PostCardAction) => {
  switch (action.type) {
    case "SET_REACT_POST_PARTIAL":
      return { ...state, reactPostPartial: action.payload };
    default:
      return state;
  }
};

export const usePostCardReducer = () => {
  return useReducer(reducer, state);
};
