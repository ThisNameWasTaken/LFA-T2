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
        expect(new Grammar(initialState, finalStates, transitions2).getWords(2)).to.deep.equal(["aa"]);
        expect(new Grammar(initialState, finalStates, transitions2).getWords(3)).to.deep.equal(["bbb"]);
        expect(new Grammar(initialState, finalStates, transitions2).getWords(4)).to.deep.equal(["aaaa"]);
        expect(new Grammar(initialState, finalStates, transitions2).getWords(5)).to.deep.equal(["aabbb"]);
        expect(new Grammar(initialState, finalStates, transitions2).getWords(8)).to.deep.equal(["aaaaaaaa", "aabbbbbb"]);
    });
});