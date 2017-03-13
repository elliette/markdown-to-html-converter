import findBlockQuotes from './converter-utilities/blockquotes'; 
import setCodeType from './converter-utilities/code-blocks'; 
import {getParagraphs, convertToObject} from './converter-utilities/deassembling'; 
import convertText from './converter-utilities/inline-elements'; 
import findLineBreaks from './converter-utilities/line-breaks'; 
import convertLinks from './converter-utilities/links'; 
import {findListIndexes, markListItems, findOrderedListItems} from './converter-utilities/lists'; 
import {addContainerDivs, combineText} from './converter-utilities/reassembling'; 

export default function convertToHTML(markdownText){

	let paragraphs = getParagraphs(markdownText); 

	let paragraphObjects = paragraphs.map(paragraph => convertToObject(paragraph));

	paragraphObjects = setCodeType(paragraphObjects);
	paragraphObjects = findLineBreaks(paragraphObjects);
	paragraphObjects = findBlockQuotes(paragraphObjects);

	let indexes = findListIndexes(paragraphObjects);
	paragraphObjects = markListItems(paragraphObjects, indexes);
	paragraphObjects = findOrderedListItems(paragraphObjects);

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