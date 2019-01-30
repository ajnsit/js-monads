// Monads in JS

// Without babel / rewriting
// The point is to NOT have to use chaining, but use natural syntax.

// Interface
// Define a pure, constructors with corresponding binds (then), and a run

// E.g. Maybe
import Maybe from './Maybe.js';

// Test

// Adds 6
async function foo(x) {
 x = await Maybe.Pure(x+1);
 x = await Maybe.Pure(x+2);
 return await Maybe.Pure(x+3);
}

// Like foo, but fails
async function foof(x) {
 x = await Maybe.Nothing();
 x = await Maybe.Pure(x+2);
 return await Maybe.Pure(x+3);
}

// Adds 24
async function bar(x) {
 x = await foo(x+1);
 x = await foo(x+2);
 return await foo(x+3);
}

// Invocation
var p = Maybe.Run(bar(1));

// Oof, getting things out is async
p.then(function(x) {
  var el = document.getElementById('result');
  el.innerHTML += x
});
