"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function setUpTrie() {
    var trie = new index_1.default();
    // Set up trie model
    [
        "cat",
        "car",
        "bat",
    ].forEach(function (name) { return trie.insert(name); });
    return trie;
}
;
var trie = setUpTrie();
// Search for names that start with "Ed";
var searchResult = trie.search("cath");
console.log("searchResult", searchResult);
var ca = trie.findCount("ca");
var cat = trie.findCount("cat");
var cathy = trie.findCount("cathy");
var bab = trie.findCount("bab");
var ba = trie.findCount("ba");
var z = trie.findCount("z");
console.log("ba", ba);
console.log("bab", bab);
console.log("ca", ca);
console.log("cat", cat);
console.log("cathy", cathy);
console.log("z", z);
