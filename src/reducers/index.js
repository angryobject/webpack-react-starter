import { combineReducers } from 'redux';
import { EXCLAMATIONS, CHANGE_EXCLAMATION } from 'actions';

function exclamation(state = EXCLAMATIONS[0], action) {
   switch (action.type) {

      case CHANGE_EXCLAMATION:
         const ex =  EXCLAMATIONS;
         return ex[ (ex.indexOf(action.lastValue) + 1) % ex.length ];

      default:
         return state;

   }
}

export default combineReducers({
   exclamation
});
