// Variables
const input = document.querySelector('.write-text'); // get the value
const form = document.querySelector('form'); // listeners
const btn = document.querySelector('.btn');	// button
btn.disabled = true;
const container = document.querySelector('.container'); // збільшувать коли count буде > 4 
let list = document.querySelector('.list'); // embed content
let count = 0; // click counts
let h = 450;
let listArray = [];
let listName = 'my-exercise';

// Listeners
form.addEventListener('submit', function (e) {
	e.preventDefault();
	if(!input.value) {
		return;
	}
	// create obj 
	let newItem = {
		id: getNewID(listArray),
		name: input.value
	}
	listArray.push(newItem);
	saveList(listArray, listName)
	// add item
	let todoItem = createItem(newItem);
	list.append(todoItem.item);
	// clean
	input.value = '';
	btn.disabled = true;
})
input.addEventListener('input', function() {
	if (input.value !== '') {
		btn.disabled = false;
	} 
	else {
		btn.disabled = true;
	}
})

// Function
// create item
function createItem(obj) {
	const item = document.createElement('div');
	let checkbox = document.createElement('input');
	let text = document.createElement('label');
	item.classList.add('item');
	checkbox.classList.add('checkbox');
	checkbox.setAttribute('type', 'checkbox');
	text.textContent = obj.name;
	item.append(checkbox);
	item.append(text);
	countPlus();
	checkbox.onchange = function () {
		item.remove();
		for (let i = 0; i < listArray.length; i++) {
			if(listArray[i].id == obj.id) listArray.splice(i, 1);
		}
		saveList(listArray, listName);
		countMinus();
	}
	return {
		item,
		checkbox, 
		text
	}
}
// check localStorage
let localDate = localStorage.getItem(listName)
if(localDate !== null && localDate !== '') {
	listArray = JSON.parse(localDate);
	for (const itemList of listArray) {
		let todoItem = createItem(itemList);
		list.append(todoItem.item);
	}
}
function countPlus () {
	count ++;
	if(count > 4) {
		h = h + 70;
		container.style.height = h + 'px';
	}
}
function countMinus() {
	count--
	if(count >= 4) {
		h = h - 70;
		container.style.height = h + 'px';
	}
}
// create id
function getNewID(arr) {
	let max = 0;
	for (const item of arr) {
		if(item.id > max) max = item.id;
	}
	return max + 1;
}
// add to localStorage
function saveList (arr, keyName) {
	localStorage.setItem(keyName, JSON.stringify(arr));
}
