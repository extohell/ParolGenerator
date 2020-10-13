window.addEventListener("DOMContentLoaded", function () {
	const btn = document.querySelector(".btn"),
		count = document.querySelector('input[type="number"]'),
		result = document.querySelector(".result"),
		upperCheck = document.querySelector("#upper"),
		specialsCheck = document.querySelector("#chars"),
		specials = [],
		letters = [],
		upperLetters = [],
		numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

	for (let i = 33; i <= 47; i++) specials.push(String.fromCharCode(i));
	for (let i = 58; i <= 63; i++) specials.push(String.fromCharCode(i));
	for (let i = 91; i <= 95; i++) specials.push(String.fromCharCode(i));
	for (let i = 123; i <= 126; i++) specials.push(String.fromCharCode(i));
	for (let i = 97; i <= 122; i++) letters.push(String.fromCharCode(i));
	for (let i = 65; i <= 90; i++) upperLetters.push(String.fromCharCode(i));

	count.addEventListener("blur", function () {
		if (+count.value < 4 || +count.value > 20) {
			alert("Недопустимое количество символов");

			if (+count.value < 4) count.value = 4;
			if (+count.value > 20) count.value = 20;
		}

		let temp = "";
		for (let i = 0; i < +this.value; i++) {
			temp += "<span>-</span>";
		}
		result.innerHTML = temp;
	});

	const getRandom = (arr) => {
		return arr[Math.round(Math.random() * (arr.length - 1))];
	};

	const getPassword = (arr, count, upperCase, includeSpecials) => {
		let pass = getRandom(numbers) + getRandom(letters);

		if (upperCase) {
			pass += getRandom(upperLetters);
		}
		if (includeSpecials) {
			pass += getRandom(specials);
		}

		for (let i = pass.length; i < count; i++) {
			pass += arr[Math.round(Math.random() * (arr.length - 1))];
		}

		pass = pass.split("").sort((a, b) => Math.random() - 0.5);
		return pass;
	};

	btn.addEventListener("click", function () {
		this.disabled = true;
		let index = 0;

		let arr = [...letters, ...numbers];

		if (upperCheck.checked) arr = [...arr, ...upperLetters];
		if (specialsCheck.checked) arr = [...arr, ...arr, ...arr, ...specials];

		const pass = getPassword(arr, +count.value, upperCheck.checked, specialsCheck.checked);

		let timerId = setInterval(() => {
			for (let j = index; j < count.value; j++) {
				result.children[j].innerHTML = getRandom(arr);
			}
		}, 100);

		let incrId = setInterval(() => {
			result.children[index].innerHTML = pass[index];
			index++;

			if (index >= count.value) {
				clearInterval(timerId);
				timerId = null;
				clearInterval(incrId);
				incrId = null;
				this.disabled = false;
			}
		}, 300);
	});
});
