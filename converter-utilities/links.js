/* 
===============================================================
===============================================================
===============================================================

CONVERTING LINKS FUNCTIONS: 

***** Description: Add description here *** 
===============================================================
===============================================================
===============================================================
*/ 


function getAllLinks(text) {
	var inDescription = false;
	var inUrl = false;
	var startIndex;
	var endIndex;
	var description = "";
	var url = "";
	var links = [];

	for (var i = 0; i < text.length; i++) {
		if (text[i] === "[" && inDescription === false) {
			inDescription = true;
			startIndex = i;
		} else if (text.slice(i, i + 2) === "](") {
			inDescription = false;
			inUrl = true;
		} else if (inUrl === true && text[i] === ")") {
			inUrl = false;
			endIndex = i;
			links.push({
				type: 'link',
				startIndex,
				endIndex,
				description,
				url: url.slice(1)
			});
			startIndex = undefined;
			endIndex = undefined;
			description = "";
			url = "";

		} else if (inDescription) {
			description += text[i];

		} else if (inUrl === true) {
			url += text[i];
		}
	}
	return links;
}


function findImageLinks(links, text) {
	return links.map(link => {
		if (text[link.startIndex - 1] === "!") {
			var splitLink = link.url.trim(); 
			if (splitLink.indexOf(" ") > -1){
				var index = splitLink.indexOf(" "); 
				var url = splitLink.slice(0, index); 
				var alt = splitLink.slice(index+1); 
				return {type: "image", startIndex: link.startIndex -1, endIndex: link.endIndex,  description: link.description, url, alt}
			} else {
			return {
				type: "image",
				startIndex: link.startIndex - 1,
				endIndex: link.endIndex,
				description: link.description,
				url: link.url
			};
				}
		} else {
			return link;
		}
	});
}

function translateLink(link) {
	var converted;
	if (link.type === 'link') {
		converted = `<a href="${link.url}">${link.description}</a>`;
	}
	if (link.type === 'image') {
		if (link.hasOwnProperty('alt')) {
			converted = `${link.description}</br><img src="${link.url}" alt=${link.alt} />`;
		} else {
			converted = `${link.description}</br><img src="${link.url}" />`;
		}
	}

	return {
		startIndex: link.startIndex,
		endIndex: link.endIndex,
		link: converted
	};
}

function convertAllLinks(text, links) {
	var result = "";
	links.forEach((link, index) => {
		if (index === 0) {
			result += text.slice(0, link.startIndex);
		} else {
			result += text.slice(links[index - 1].endIndex + 1, link.startIndex);
		}
		result += link.link;
	});
	result += text.slice(links[links.length - 1].endIndex + 1);
	return result;
}

export default function convertLinks(objectArray) {
	return objectArray.map(item => {
		let links = getAllLinks(item.content);
		if (links.length) {
			links = findImageLinks(links, item.content);
			links = links.map(link => translateLink(link))
			let newText = convertAllLinks(item.content, links)
			return {
				type: item.type,
				content: newText
			}
		} else {
			return item
		}
	});
}
