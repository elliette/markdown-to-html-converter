/* This is where we now try to find unordered lists */

export function findListIndexes(objectArray) {
	var indexArr = [];
	objectArray.map((obj, i) => {
		var check = obj.content.slice(0, 2);
		if (check === "* " || check === "+ " || check === "- ") {
			indexArr.push(i);
		}
	});

	return indexArr;
}

export function markListItems(objectArr, indexArr) {
	return objectArr.map((item, i) => {
		if (i === indexArr[0]) {
			indexArr.shift();
			return {
				type: "ul li",
				content: item.content.slice(2)
			};
		} else {
			return item;
		}
	});
}

/* This is where we now find ordered lists */

export function findOrderedListItems(objectArr) {
	var inList = false;
	var listNum = 1;
	return objectArr.map((item, index) => {
		if (item.content.slice(0, 3) === `${listNum}. `) {
			listNum++;
			inList = true;
			return {
				type: "ol li",
				content: item.content.slice(3)
			};
		}

		if (inList === true && item.content.slice(0, 3) !== `${listNum}. `) {
			inList = false;
			listNum = 1;
		}
		return item;
	});
}
