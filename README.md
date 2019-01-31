# Monadic do-notation in JS, without using babel!

This repository shows how to override async/await to have something similar to monadic do-notation in javascript. This doesn't require overriding promises, or using any form of babel transformation.

To use, simply mark monadic functions with `async` and use `await` to extract pure/concrete value out of a monadic value. Since `await` can only be used inside `async` functions, you are automatically prevented from trying to extract values out of pure values.

### Maybe Monad example -

Let's build the JS equivalent for the following (contrived) Haskell code.

(Note that since JS allows arbitrary IO in functions, the equivalent code in Haskell uses `MaybeT IO` instead of `Maybe`.)

#### Haskell

```haskell
import qualified Data.Maybe as Maybe

-- Adds 6
foo :: Int -> MaybeT IO Int
foo x = do
  lift $ putStrLn ("foo" <> show x)
  x <- pure (x+1)
  x <- pure (x+2)
  pure (x+3)

-- Like foo, but fails
foof :: Int -> MaybeT IO Int
foof x = do
  lift $ putStrLn ("foof" <> show x)
  x <- pure Maybe.Nothing
  x <- pure (x+2)
  pure (x+3)

-- Adds 24
bar :: Int -> MaybeT IO Int
bar x = do
  lift $ putStrLn ("bar" <> show x)
  x <- foo (x+1)
  x <- foof (x+2)
  foo (x+3)
```

#### Javascript

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

## Running monadic values

**Note that getting concrete values out is asynchronous, as async/await insists on wrapping the result in Promises**

```purescript
  var p = Maybe.Run(bar(1));
  p.then(function(x) {console.log(x)});
```

You can see this code [in action here](https://ajnsit.github.io/js-monads/).
