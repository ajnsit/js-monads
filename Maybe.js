// Maybe Monad

const Maybe = {
 // API

 // Pure
 Pure: (x) => Maybe.Just(x),

 // The Run function normalises the Just and Nothing cases
 // It's needed because JS promises are ridiculous
 Run: function(p) {
   let handleCompletion = function(x){
     return Maybe.Just_(x);
   };
   let handleShortCircuit = function(x){
     return x;
   };
   return p.then(handleCompletion, handleShortCircuit);
 },

 // Bind for Nothing
 Nothing: () => {
   return {
     then: function(_, onReject) {
       // There seems to be no way to avoid calling atleast one of onSuccess or onReject
       // If I don't call one of those, the engine just constructs its own Promise which never resolves.
       // In particular, I can't return my own promise
       // So what I am doing is using exceptions to short circuit
       //  and handle the shortcircuit cases in Promise.prototype.get()
       onReject(Maybe.Nothing_);
     }
   };
 },

 // Bind for Just
 Just: (x) => {
   return {
     then: function(onSuccess) {
       // Pass the wrapped value to the continuation
       onSuccess(x)
     }
   };
 },

 // Raw constructors for convenience
 Just_: function(x) {
   return ["Just", x]; // {tag: "Just", val: x}
 },

 Nothing_: ["Nothing"] // {tag: "Nothing"}
};

export default Maybe;
