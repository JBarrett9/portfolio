import "./romance.css";
import { example, firework, fox } from "./songs";

const Romance = () => {
  /**
   * Utilizes a Markov Chain to produce a poem base on input text.
   *
   * @param {string} wordCorpus
   * @param {number} lines
   * @param {number} lineLen - Number of words in each line
   * @returns
   */
  function generatePoem(wordCorpus, lines, lineLen) {
    if (!lineLen) lineLen = Math.floor(Math.random() * 10);
    if (!lines) lines = Math.floor(Math.random() * 10);
    let words = parseText(wordCorpus);
    let mChain = generateWordPairs(words);
    let poem = "";
    for (let i = 0; i < lines; i++) {
      poem += "\n" + writeLine(mChain, lineLen);
    }
    return poem;
  }

  /**
   * Generates a random title
   * @param {string} text
   * @returns {string}
   */
  const generateTitle = (text) => {
    let words = parseText(text);
    let mChain = generateWordPairs(words);
    return writeLine(mChain, Math.floor(Math.random() * 5));
  };

  /**
   * Returns a markov chain for the given set of words
   *
   *  @param {[]} arr
   * @returns {{}}
   */
  const generateWordPairs = (arr) => {
    let mChain = {};
    let n = arr.length - 1;
    for (let i = 0; i < n; i++) {
      let currWord = arr[i];
      if (mChain[currWord]) mChain[currWord].push(arr[i + 1]);
      else mChain[currWord] = [arr[i + 1]];
    }

    return mChain;
  };

  /**
   *
   * @param {number} selection
   * @returns {string} selected song
   */
  const getSong = (selection) => {
    let songs = {
      0: example,
      1: firework,
      2: fox,
    };
    return songs[selection];
  };

  /**
   * Returns a random word from the given mMrkov chain
   *
   * @param {{}} mChain
   * @returns {string}
   */
  const getStartWord = (mChain) => {
    let words = Object.keys(mChain);
    return words[Math.floor(Math.random() * words.length)];
  };

  /**
   * Get a random word from input Markov chain base on input word
   *
   * @param {{}} mChain
   * @param {string} word
   * @returns string
   */
  const getWord = (mChain, word) => {
    let currWord = mChain[word];
    let res = "";
    if (currWord) {
      res = currWord[Math.floor(Math.random() * currWord.length)];
    } else {
      res = getStartWord(mChain);
    }

    return res;
  };

  /**
   * Returns an array of words from in iput string
   *
   * @param {string} str
   * @returns {[]}
   */
  // split with regex for alphanumeric characters and ' then filter to remove empty strings.
  const parseText = (str) =>
    str.split(/[^a-z0-9']/i).filter((element) => element);

  /**
   * Generate a line of poetry from input Markov chain
   * @param {{}} mChain
   * @param {number} n number of words in the line
   * @returns
   */
  const writeLine = (mChain, n) => {
    let word = getStartWord(mChain);
    let line = word.charAt(0).toUpperCase() + word.slice(1);
    for (let i = 0; i < n; i++) {
      word = getWord(mChain, word);
      line += " " + word.toLowerCase();
    }
    return line;
  };

  ///////////////////////
  // Handling the page //
  ///////////////////////

  let form = document.getElementById("control");
  let poem = document.getElementById("poem");
  let title = document.getElementById("title");

  const handleSubmit = (e) => {
    let song = getSong(form.elements["song"].value);
    let lines = form.elements["lines"].value;
    let words = form.elements["words"].value;
    if (song) {
      title.textContent = generateTitle(song);
      if (lines && words) {
        poem.textContent = generatePoem(song, lines, words);
      } else if (lines) {
        poem.textContent = generatePoem(song, lines);
      } else {
        poem.textContent = generatePoem(song);
      }
    } else {
      title.textContent = generateTitle(firework);
      poem.textContent = generatePoem(firework);
    }
  };

  return (
    <div className="romance">
      <form id="control">
        <label>Song:</label>
        <select name="song" id="song">
          <option value={0}>Hotline Bling</option>
          <option value={1}>Firework</option>
          <option value={2}>What Does the Fox Say</option>
        </select>
        <label># of Lines: </label>
        <input className="num-input" min="1" type="number" name="" id="lines" />
        <label># of Words per Line: </label>
        <input className="num-input" min="1" type="number" name="" id="words" />
        <button id="submit" type="button" onClick={handleSubmit}>
          Generate
        </button>
      </form>
      <div className="frame">
        <h2 id="title"></h2>
        <p id="poem"></p>
      </div>
    </div>
  );
};

export default Romance;
