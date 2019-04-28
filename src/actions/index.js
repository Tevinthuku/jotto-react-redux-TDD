export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS"
};
/**
 * @function correctGuess
 * @returns {object}
 */
export function correctGuess() {
  return { type: actionTypes.CORRECT_GUESS };
}
