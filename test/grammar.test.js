import { expect } from 'chai';
import Grammar from '../js/grammar';

const transitions = {
    'S': { 'a': ['S'], 'b': ['A'] },
    'A': { 'c': ['A'] }
};

const transitions2 = {
    'S': { 'a': ['A'], 'b': ['B'] },
    'A': { 'a': ['S'] },
    'B': { 'b': ['C'] },
    'C': { 'b': ['D'] },
    'D': { 'b': ['B'] }
};

const initialState = 'S';
const finalStates = ['S', 'D'];

describe('getWords', function () {
    it('should return the list of words known by a given grammar', function () {
        expect(new Grammar('S', 'A', transitions).getWords(2)).to.deep.equal(["ab", "bc"]);
        expect(new Grammar('S', 'A', transitions).getWords(3)).to.deep.equal(["aab", "abc", "bcc"]);
        expect(new Grammar('S', 'A', transitions).getWords(4)).to.deep.equal(["aaab", "aabc", "abcc", "bccc"]);
    });
});

describe('isWordValid', function () {
    it('should assert whether the gvien word is valid for the grammar or not', function () {
        expect(new Grammar(initialState, finalStates, transitions2).isWordValid("aa")).to.equal(true);
        expect(new Grammar(initialState, finalStates, transitions2).isWordValid("bbb")).to.equal(true);
        expect(new Grammar(initialState, finalStates, transitions2).isWordValid("a")).to.equal(false);
        expect(new Grammar(initialState, finalStates, transitions2).isWordValid("bbbb")).to.equal(false);
    });
});