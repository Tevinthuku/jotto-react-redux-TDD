import { storeFactory } from "./tests/testUtils";

import { guessWord } from "./actions";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unssuccessfulGuess = "train";
  describe("no guessed words", () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("should update state correctly for unsuccesful guess", () => {
      store.dispatch(guessWord(unssuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{ guessedWord: unssuccessfulGuess, letterMatchCount: 3 }]
      };

      expect(newState).toEqual(expectedState);
    });

    test("should update state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }]
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe("some guessed words", () => {
    const guessedWords = [{ guessWord: "agile", letterMatchCount: 1 }];
    const initialState = { guessedWords, secretWord };
    let store;

    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("should update state correctly for unssuccessful guess", () => {
      store.dispatch(guessWord(unssuccessfulGuess));
      const newState = store.getState();

      const expectedState = {
        secretWord,
        success: false,
        guessedWords: [
          ...guessedWords,
          { guessedWord: unssuccessfulGuess, letterMatchCount: 3 }
        ]
      };
      expect(newState).toEqual(expectedState);
    });

    test("should update state correctly for successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();

      const expectedState = {
        secretWord,
        success: true,
        guessedWords: [
          ...guessedWords,
          { guessedWord: secretWord, letterMatchCount: 5 }
        ]
      };

      expect(newState).toEqual(expectedState);
    });
  });
});
