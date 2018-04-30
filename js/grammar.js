export default class Grammar {
    /**
     * @param {String} initialState
     * @param {Array<String>} finalStates
     * @param {JSON} transitions
     */
    constructor(initialState, finalStates, transitions) {
        this._initialState = initialState;
        this._finalStates = finalStates;
        this._transitions = transitions;

        this._words = [];
    }

    /**
     * @returns {Array<String>} A list of words of the given length known by a the grammar
     * @param {Number} length 
     */
    getWords(length) {
        this._words = [];

        this._generateAllKnwonWords(length);

        return this._words;
    }

    /**
     * @private Generates all words of the given length known by the grammar
     */
    _generateAllKnwonWords(length, currentState = this._initialState, word = '') {
        // The generated word is long enough
        if (word.length >= length) {
            if (this._finalStates.includes(currentState)) {
                this._words.push(word);
            }
            return;
        }

        // Go through each state that the current state can Go through
        for (const letter in this._transitions[currentState]) {
            for (const transition of this._transitions[currentState][letter]) {
                this._generateAllKnwonWords(
                    length,
                    transition,
                    word + letter
                );
            }
        }
    }

    /**
     * @returns a boolean value which asserts whether the gvien word is valid for the grammar or not
     * @param {String} word 
     */
    isWordValid(word) {
        return this.getWords(word.length).includes(word);
    }
}