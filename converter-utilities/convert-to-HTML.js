import findBlockQuotes from './blockquotes'; 
import setCodeType from './code-blocks'; 
import {getParagraphs, convertToObject} from './deassembling'; 
import convertText from './inline-elements'; 
import findLineBreaks from './line-breaks'; 
import convertLinks from './links'; 
import {addContainerDivs, combineText} from '.reassembling'; 
import convertSpecialCharacters from './special-characters'; 

function convertToHTML(markdownText) => {

	let paragraphs = getParagraphs(markdownText); 

	let paragraphObjects = paragraphs.map(paragraph => convertToObject(paragraph));

	paragraphObjects = setCodeType(paragraphObjects);
	paragraphObjects = findLineBreaks(paragraphObjects);
	paragraphObjects = findBlockQuotes(paragraphObjects);

	let indexes = findListIndexes(paragraphObjects);
	paragraphObjects = markListItems(paragraphObjects, indexes);
	paragraphObjects = findOrderedListItems(paragraphObjects);

	paragraphObjects = convertSpecialCharacters(paragraphObjects);
	paragraphObjects = convertLinks(paragraphObjects);

	paragraphObjects = paragraphObjects.map(paragraph => {
		return {
			type: paragraph.type,
			content: convertText(paragraph.content + " ").trim()  // this hack is needed because if not styling at the end of a paragraph will not be counted 
		} 
	}); 

	paragraphObjects = addContainerDivs(paragraphObjects);
	let arrayOfHTML = combineText(paragraphObjects); 

	return arrayOfHTML.join("\n"); 
}