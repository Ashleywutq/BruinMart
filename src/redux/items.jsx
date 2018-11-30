import * as ActionTypes from './ActionTypes';
import { itemsRef } from '../firebase';

export const sellItems = (
    state = {
        isLoading: false,
        sellItems: [],
        err: null,
        origSellItems: []
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.RESERVE_ITEM:           
            var key = action.payload;
            for (var i = 0; i < state.sellItems.length; i++){
                if (state.sellItems[i]['id'] === key){
                    state.sellItems[i]['reserved'] = true;
                    console.log(state.sellItems[i]['reserved']);
                    break;
                }
            }
            return state;
        case ActionTypes.FILTER:
            var searchText = action.payload.searchText;
            return {
                ...state,
                isLoading: false,
                err: null,
                sellItems: state.origSellItems
                    .filter((item) => {
                        if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
                            return true;
                        }
                        if (item.keywords && item.keywords.includes(searchText)) {
                            return true;
                        }
                        return false;
                    })
                    .slice(0, action.payload.maxResults)
            };
        case ActionTypes.ADD_ITEM:
            return {
                ...state,
                sellItems: state.sellItems.concat(action.payload),
                origSellItems: state.origSellItems.concat(action.payload)
            };
        case ActionTypes.ADD_ITEMS:
            return { ...state, isLoading: false, err: null, sellItems: action.payload, origSellItems: action.payload };
        case ActionTypes.ITEMS_LOADING:
            return { ...state, isLoading: true, err: null, sellItems: [], origSellItems: [] };
        case ActionTypes.ITEMS_FAILED:
            return { ...state, isLoading: false, err: action.payload, sellItems: [], origSellItems: [] };
        default:
            return state;
    }
};
