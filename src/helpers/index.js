/**
 *
 * @param {string} guessedWord - word guessed
 * @param {string} secretWord - the secret word
 */

export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetterSet = new Set(secretWord.split(""));
  const guessedLetterSet = new Set(guessedWord.split(""));
  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter))
    .length;
}
