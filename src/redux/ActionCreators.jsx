import * as ActionTypes from './ActionTypes';
import { itemsRef } from '../firebase';

export const filterResults = (searchText, maxResults = 20) => ({
    type: ActionTypes.FILTER,
    payload: {
        searchText: searchText,
        maxResults: maxResults
    }
});

// export const postItems = (itemName, pictures, price, description) => (dispatch) => {
//     const newItem = {
//         itemName: itemName,
//         pictures: pictures,
//         price: price,
//         description: description
//     };

//     newItem.date = new Date().toISOString();

//     return itemsRef
//         .push(newItem)
//         .then((snapshot) => {
//             newItem.id = snapshot.id;
//             dispatch(addItem(item));
//         })
//         .catch((error) => dispatch(itemsFailed(error.message)));
// };

//  This is a thunk
export const fetchItems = () => (dispatch) => {
    console.log(itemsRef);
    dispatch(itemsLoading(true));

    return itemsRef
        .once('value')
        .then((snapshot) => {
            console.log(snapshot.val());
            if (snapshot.val() === null) throw Error('Fetch failed.');
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
