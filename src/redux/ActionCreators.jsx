import * as ActionTypes from "./ActionTypes";

export const filterResults = (searchText, maxResults = 20) => ({
    type: ActionTypes.FILTER,
    payload: {
        searchText: searchText,
        maxResults: maxResults
    }
});