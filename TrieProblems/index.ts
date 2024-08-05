// References for learning
// https://javascripttoday.com/blog/trie-data-structure/
// https://reintech.io/blog/understanding-implementing-trie-javascript
// https://youcademy.org/trie-data-structure/

export class TrieNode {
  children: {};
  isEnd: boolean;
  value?: string;
  constructor(value?: string) {
    this.value = value;
    this.children = {};
    this.isEnd = false;
  }
}

export default class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
      let node = this.root;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!node.children[char]) {
          node.children[char] = new TrieNode(char);
        }
        node = node.children[char];
      }
      node.isEnd = true;
    }

  // If all characters are found in order then return true otherwise return false
  search(word: string) {
    let node = this.root;
    for(let i = 0; i < word.length; i++) {
      const char = word[i];
      if(node.children[char]) {
        node = node.children[char];
      } else {
        return false;
      }
    };
    return node.isEnd;
  };

  startsWith(prefix: string) {
    let node = this.root;
    for(let i = 0; i < prefix.length; i++) {
      let char = prefix[i];
      if(!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  };

  findCount(prefix: string) {
    // Helper function to count all words starting from a given node
    const countWords = (node: TrieNode): number => {
    let count = node.isEnd ? 1 : 0;
      for (let char in node.children) {
        count += countWords(node.children[char]);
      }
      return count;
    }

    // Now to find the count
    let node = this.root;

    // Traverse the Trie to the end of the prefix
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (node.children[char]) {
        node = node.children[char];
      } else {
        // Prefix not found
        return 0;
      }
    }

    // Count all words starting from the node corresponding to the last character of the prefix
    return countWords(node);
  }
}