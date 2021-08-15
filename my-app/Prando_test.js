import Prando from 'prando';
let rng = new Prando("0x54022De0c0002ECe4F83eEf6A2c59f6cb8440515");
var arr = [];
for (var i=0; i < 10; i++) {
  arr.push(rng.nextInt(0,100));
}

console.log(arr);
