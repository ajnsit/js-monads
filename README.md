# Monads in JS!

The aim is to have a natural syntax for monads, instead of using a jQuery like monadic syntax. 

So we override the async await syntax.

### Maybe Monad example -

**Construct monadic values**

```javascript
  import Maybe from './Maybe.js';

  // Adds 6
  async function foo(x) {
    console.log("foo", x)
    x = await Maybe.Pure(x+1);
    x = await Maybe.Pure(x+2);
    return await Maybe.Pure(x+3);
  }

  // Like foo, but fails
  async function foof(x) {
    console.log("foof", x)
    x = await Maybe.Nothing();
    x = await Maybe.Pure(x+2);
    return await Maybe.Pure(x+3);
  }

  // Adds 24
  async function bar(x) {
    console.log("bar", x)
    x = await foo(x+1);
    x = await foof(x+2);
    return await foo(x+3);
  }
```

**Running monadic values**

**Note that getting concrete values out is asynchronous, as async/await insists on wrapping the result in Promises**

```purescript
  var p = Maybe.Run(bar(1));
  p.then(function(x) {console.log(x)});
```
