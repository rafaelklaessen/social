// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

/**
 * Spooky scary ES6
 * (demo)
 */
class Kees {
  static kaas() {
    return true;
  }
}
let k = z => `jan ${z}`,
    l = () => 'piet';
const p = (y = 'kaas') => `text: ${y}`
console.log(k);
console.log(k('kees'));
console.log(l);
console.log(l());
console.log(p);
console.log(p());
console.log(p('kees'));
console.log(Kees.kaas());
let logAll = (toLog) => {
  let arr = toLog.split('');
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
console.log(logAll);
logAll('I love ES6!');
