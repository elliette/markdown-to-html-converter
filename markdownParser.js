

var paragraphs = getParagraphs(testMD);
paraObjects = paragraphs.map(paragraph => convertToObject(paragraph));
var objectArr = setCodeType(paraObjects);
var objectArr = findLineBreaks(objectArr);
var objectArr = findBlockQuotes(objectArr);



var indexes = findListIndexes(objectArr);
objectArr = markListItems(objectArr, indexes);
objectArr = findOrderedListItems(objectArr);


objectArr = convertSpecialCharacters(objectArr);


objectArr = convertLinks(objectArr);

objectArr = objectArr.map(item => {
	return {
		type: item.type,
		content: convertText(item.content + " ").trim()
	} // this hack is needed because if not styling at the end of a paragraph will not be counted 
})


objectArr = addContainerDivs(objectArr);

var resultingArray = combineText(objectArr);

console.log(resultingArray.join("\n"))