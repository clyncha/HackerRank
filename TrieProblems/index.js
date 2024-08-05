"use strict";
// References for learning
// https://javascripttoday.com/blog/trie-data-structure/
// https://reintech.io/blog/understanding-implementing-trie-javascript
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrieNode = void 0;
var TrieNode = /** @class */ (function () {
    function TrieNode(value) {
        this.value = value;
        this.children = {};
        this.isEnd = false;
    }
    return TrieNode;
}());
exports.TrieNode = TrieNode;
var Trie = /** @class */ (function () {
    function Trie() {
        this.root = new TrieNode();
    }
    Trie.prototype.insert = function (word) {
        var node = this.root;
        for (var i = 0; i < word.length; i++) {
            var char = word[i];
            if (!node.children[char]) {
                node.children[char] = new TrieNode(char);
            }
            node = node.children[char];
        }
        node.isEnd = true;
    };
    // If all characters are found in order then return true otherwise return false
    Trie.prototype.search = function (word) {
        var node = this.root;
        for (var i = 0; i < word.length; i++) {
            var char = word[i];
            if (node.children[char]) {
                node = node.children[char];
            }
            else {
                return false;
            }
        }
        ;
        return node.isEnd;
    };
    ;
    Trie.prototype.startsWith = function (prefix) {
        var node = this.root;
        for (var i = 0; i < prefix.length; i++) {
            var char = prefix[i];
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    };
    ;
    Trie.prototype.findCount = function (prefix) {
        var node = this.root;
        // Traverse the Trie to the end of the prefix
        for (var i = 0; i < prefix.length; i++) {
            var char = prefix[i];
            if (node.children[char]) {
                node = node.children[char];
            }
            else {
                // Prefix not found
                return 0;
            }
        }
        // Helper function to count all words starting from a given node
        var countWords = function (node) {
            var count = node.isEnd ? 1 : 0;
            for (var char in node.children) {
                count += countWords(node.children[char]);
            }
            return count;
        };
        // Count all words starting from the node corresponding to the last character of the prefix
        return countWords(node);
    };
    return Trie;
}());
exports.default = Trie;
