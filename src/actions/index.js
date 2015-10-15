/*
 * Action types
 */

export const CHANGE_EXCLAMATION = 'CHANGE_EXCLAMATION';

/*
 * Ohter constants
 */

export const EXCLAMATIONS = ['Hooray!', 'Yay!', 'Yahoo!', 'Yarrr!'];

/*
 * Action creators
 */

export function changeExclamation(lastValue) {
   return {
      type: CHANGE_EXCLAMATION,
      lastValue
   };
}
