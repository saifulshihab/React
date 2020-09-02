import * as ActionType from './ActionTypes';

export const Comments = (
  state = {
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionType.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload,
      };
    case ActionType.ADD_COMMENT:
      let comment = action.payload;     
      return { ...state, comments: state.comments.concat(comment) };

    case ActionType.COMMENTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, comments: [] };
    default:
      return state;
  }
};
