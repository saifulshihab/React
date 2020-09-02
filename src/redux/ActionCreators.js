import * as ActionType from './ActionTypes';
import { baseURL } from '../shared/baseURL';

export const addComment = (comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();
  return fetch(baseURL + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status} : ${response.statusText}.`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errormess = new Error(error.message);
        throw errormess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) =>
      alert(`Your comment could not be posted! Error ${error.message}`)
    );
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishLoading(true));
  return fetch(baseURL + 'dishes')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status} : ${response.statusText}.`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errormess = new Error(error.message);
        throw errormess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishFailed(error.message)));
};

export const dishLoading = () => ({
  type: ActionType.DISHES_LOADING,
});

export const dishFailed = (errmess) => ({
  type: ActionType.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionType.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseURL + 'comments')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status} : ${response.statusText}.`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errormess = new Error(error.message);
        throw errormess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const addComments = (comments) => ({
  type: ActionType.ADD_COMMENTS,
  payload: comments,
});

export const commentsFailed = (errmess) => ({
  type: ActionType.COMMENTS_FAILED,
  payload: errmess,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseURL + 'promotions')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status} : ${response.statusText}.`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errormess = new Error(error.message);
        throw errormess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionType.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionType.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionType.ADD_PROMOS,
  payload: promos,
});
