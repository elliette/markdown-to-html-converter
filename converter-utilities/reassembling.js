export function addContainerDivs(objectArr) {
	var result = [];

	var parentOptions = [
		['ol li', 'ul li', 'code'],
		['ol', 'ul', 'pre code'],
		['li', 'li', ]
	];

	objectArr.forEach((item, index) => {

		if (parentOptions[0].includes(item.type)) {

			let parentIndex = parentOptions[0].indexOf(item.type); // 0 for 'ol li', 1 for 'ul li', and 2 for 'code'; 

			if (!objectArr[index - 1] || objectArr[index - 1].type !== parentOptions[0][parentIndex]) {

				result.push({
					type: parentOptions[1][parentIndex],
					content: ""
				});
				result.push(item);
			} else {

				result.push(item);
			}

			if (!objectArr[index + 1] || objectArr[index + 1].type !== parentOptions[0][parentIndex]) {

				result.push({
					type: parentOptions[1][parentIndex],
					content: ""
				});
			}

		} else {

			result.push(item);
		}


	});
	return result;

}




export function combineText(objectArr) {

	return objectArr.map((item, index) => {

		if (item.type === 'hr' || item.type === 'br') {

			return `<${item.type}/>`
		} else if (item.type === 'pre code') {

			if (objectArr[index + 1] && objectArr[index + 1].type === 'code') {

				return '<pre><code>'
			} else {
				return '</code></pre>'
			}

		} else if (item.type === 'ol' || item.type === 'ul') {

			if (objectArr[index + 1] && objectArr[index + 1].type === 'ol li' || objectArr[index + 1].type === 'ul li') {
				return item.type === 'ol' ? '<ol>' : '<ul>';

			} else {
				return item.type === 'ol' ? '</ol>' : '</ul>';
			}

		} else if (item.type === 'ol li' || item.type === 'ul li') {

			return `    <li>${item.content}</li>`

		} else if (item.type === 'code') {

			return item.content;

		} else {

			return `<${item.type}>${item.content}</${item.type}>`

		}


	})

}
