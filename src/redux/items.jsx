import { ITEMS } from '../shared/items';
import * as ActionTypes from "./ActionTypes";

export const sellItems = (state = ITEMS, action) => {
    switch (action.type) {
        case ActionTypes.FILTER:
            var searchText = action.payload;
            var searchResults = state.filter((item) => item.name == searchText);
            return searchResults;
        default:
            return state;
    }
};
