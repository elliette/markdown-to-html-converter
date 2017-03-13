/* Below is the functionality for parsing the content of each object */

function splitUpParagraph(segment, resultStr, stack, tokens, tokenIndex) {
	let startOfWord = resultStr.indexOf(stack[0].complete) + 1;
	let textBeforeSelected = resultStr.slice(0, startOfWord);
	let startToken = tokens[2][tokenIndex];
	let selected = resultStr.slice(startOfWord + segment.length - 1, resultStr.indexOf(segment));
	let endToken = tokens[3][tokenIndex];
	let textAfterSelected = resultStr.slice(resultStr.indexOf(segment) + segment.length - 1);
	return textBeforeSelected + startToken + selected + endToken + textAfterSelected;
}

export default function convertText(str) {
	str = " " + str + " "; 
	var resultStr = str;

	const tokens =
		[
			[" **", " __", " *", " _", " `"],
			["** ", "__ ", "* ", "_ ", "` "],
			["<strong>", "<strong>", "<em>", "<em>", "<code>"],
			["</strong>", "</strong>", "</em>", "</em>", "</code>"],
		];

	var stack = [];

	for (let i = 0; i < str.length; i++) {

		let charBefore = str[i - 1];

		let threeChars = str.slice(i, i + 3);
		let fourthChar = str[i + 3];

		let twoChars = str.slice(i, i + 2);
		let thirdChar = str[i + 2];


		if (tokens[0].includes(threeChars) && fourthChar !== " ") {
			let complete = threeChars + fourthChar;
			stack.unshift({
				token: threeChars,
				complete: complete
			});

		} else if (tokens[0].includes(twoChars) && thirdChar !== " ") {
			let complete = twoChars + thirdChar;
			stack.unshift({
				token: twoChars,
				complete: complete
			});
		}

		if (tokens[1].includes(threeChars) && charBefore !== " ") {
			let tokenIndex = tokens[1].indexOf(threeChars);
			let complement = tokens[0][tokenIndex];

			if (stack.length && stack[0].token === complement) {
				resultStr = splitUpParagraph(threeChars, resultStr, stack, tokens, tokenIndex, fourthChar);
				stack.shift();
			}
		} else if (tokens[1].includes(twoChars) && charBefore !== " " && charBefore !== twoChars[0]) {
			let tokenIndex = tokens[1].indexOf(twoChars);
			let complement = tokens[0][tokenIndex];

			if (stack.length && stack[0].token === complement) {
				resultStr = splitUpParagraph(twoChars, resultStr, stack, tokens, tokenIndex, thirdChar);

				stack.shift();
			}
		}
	}
	return resultStr.trim();
}

