import * as ActionTypes from './ActionTypes';
import { itemsRef } from '../firebase';

export const filterResults = (searchText, maxResults = 20) => ({
    type: ActionTypes.FILTER,
    payload: {
        searchText: searchText,
        maxResults: maxResults
    }
});

//  This is a thunk
export const fetchItems = () => (dispatch) => {

    console.log(itemsRef);
    dispatch(itemsLoading(true));

    return itemsRef
        .once('value')
        .then((snapshot) => {
            console.log(snapshot.val());
            if (snapshot.val() === null)
                throw Error('Fetch failed.');
            dispatch(addItems(snapshot.val()));
        })
        .catch((error) => dispatch(itemsFailed(error.message)));
};

export const addItems = (items) => ({
    type: ActionTypes.ADD_ITEMS,
    payload: items
});

export const itemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});

export const itemsFailed = (err) => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: err
});

