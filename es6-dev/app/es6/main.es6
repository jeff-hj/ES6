import "babel-polyfill";
import {greet} from './hello';

let name = 'Jeff';
let greeting2 = `hello ${name}`;

greet('Jeff').then((greeting) => {
  document.getElementById('container').innerHTML += greeting;
});

document.getElementById('container').innerHTML = 'I am greeting ';