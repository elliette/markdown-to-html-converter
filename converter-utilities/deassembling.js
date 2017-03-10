/* 
===============================================================
===============================================================
===============================================================

INITIAL UTILITY FUNCTIONS: 

Converts the inputted text into an array of objects with `type` and `content` properties. 
===============================================================
===============================================================
===============================================================
*/ 

export function getParagraphs(file) {
	/* 
	parameter type: 		string
							==> 
	return value type: 		array of strings 

	Description: Takes in a string of markdown and returns an array of paragraphs as separated by a blank line. 
	*/
	var paragraphs = file.split("\n");
	paragraphs = paragraphs.map(paragraph => {
		paragraph = paragraph.trim(); // removes any whitespace around the paragraph
		if (paragraph === "") {
			return "\n";
		} else {
			return paragraph;
		}
	});
	return paragraphs;
}



function setInitialType(headerCount) {
	/* 
	parameter type: 		number
							==> 
	return value type: 		string

	Description: Takes in a number and returns the correct header (h1, h2, h3) or p (for paragraph) if the number is 0, or br if it is a line break.  
	*/

	if (headerCount === -1) {
		return 'br';
	}
	if (headerCount === 0) {
		return 'p';
	} else {
		return 'h' + headerCount;
	}
}

export function convertToObject(paragraph) {
	/* 
	parameter type: 		string
							==> 
	return value type: 		object

	Description: Takes in a paragraph, and returns an object with its tag type and content. 

	ex. {type: 'h2', content: 'this is a header2'}. 
	*/
	var headerCount = 0;
	var content = "";
	paragraph.split("").forEach(char => {
		if (char === "#") {
			headerCount++;
		} else if (char === "\n") {
			headerCount = -1;
		} else {
			content += char;
		}
	});
	return {
		type: setInitialType(headerCount),
		content: content.trim()
	};
}