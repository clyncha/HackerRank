import Trie from "./index";

function setUpTrie() {
  const trie = new Trie();
  // Set up trie model
  [
    "cat",
    "car",
    "bat",
  ].forEach((name) => trie.insert(name));
  return trie;
};

const trie = setUpTrie();

// Search for names that start with "Ed";
const searchResult = trie.search("cath");
console.log("searchResult", searchResult);

const ca = trie.findCount("ca");
const cat = trie.findCount("cat");
const cathy = trie.findCount("cathy");
const bab = trie.findCount("bab");
const ba = trie.findCount("ba");
const z = trie.findCount("z");

console.log("ba", ba);
console.log("bab", bab);
console.log("ca", ca);
console.log("cat", cat);
console.log("cathy", cathy);
console.log("z", z);