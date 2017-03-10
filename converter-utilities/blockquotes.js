/* 
The following are all helper functions to find block quotes
*/


export default function findBlockQuotes(objectArray) {

	return objectArray.map(item => {

		if (item.content.slice(0, 2) === "> ") {
			return {
				type: 'blockquote',
				content: item.content.slice(2)
			};
		} else {

			return item
		}

	})
}


