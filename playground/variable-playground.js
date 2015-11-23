// var person = {
// 	name: 'Reuben',
// 	age: 21
// };
// 
// function updatePerson(obj) {
// 	// obj = {
// 	// 	name: 'Reuben',
// 	// 	age: 29
// 	// };
// 	obj.age = 29;
// 	console.log(obj);
// }
// 
// updatePerson(person);
// console.log(person);

// array example

var grades = ['91','76'];

function addGrade(arr) {
	// arr = ['91','76','34'];
	// console.log(arr);
	arr.push('34');
	
	// the debugger keyword can be used as a break point by node
	// if we run the 'node debug <filename>' command in the terminal
	// node will treat this keyword as a breakpoint for us to use the 'repl' command
	// and play around with variables and their values at this point in the code
	debugger;
}

addGrade(grades);
console.log(grades);