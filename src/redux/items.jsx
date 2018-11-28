import { ITEMS } from '../shared/items';
import * as ActionTypes from './ActionTypes';

export const sellItems = (state = ITEMS, action) => {
    switch (action.type) {
        case ActionTypes.FILTER:
            var searchText = action.payload.searchText;
            return ITEMS
                .filter((item) => {
                    if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
                        return true;
                    }
                    if (item.keywords && item.keywords.includes(searchText)) {
                        return true;
                    }
                    return false;
                })
                .slice(0, action.payload.maxResults);
        default:
            return state;
    }
};
