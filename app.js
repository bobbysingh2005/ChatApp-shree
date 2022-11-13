console.clear();

console.log('String list or prototype: ',Object.getOwnPropertyNames(String.prototype))
console.log('Number list or prototype: ',Object.getOwnPropertyNames(Number.prototype))
console.log('Array list or prototype: ',Object.getOwnPropertyNames(Array.prototype))
console.log('Function list or prototype: ',Object.getOwnPropertyNames(Function.prototype))
console.log('Object list or prototype: ',Object.getOwnPropertyNames(Object.prototype))
console.log('JSON list or prototype: ',Object.getOwnPropertyNames(JSON))

function AA () {
this.name = 'test aa'
};//end;
function BB (){
this.name = "bob test"
};
let bob = new AA();
bob.__proto__ = BB.__proto__;
console.log(bob.name)