/* Replacing special characters with the correct entities:
&amp;  ----    ampersand &
&lt;  ----     less than sign <
&gt;  ----     greater than sign >
&quot; ---- the double quote sign "
*/


export default function convertSpecialCharacters(objectArr) {

	var specialCharacters =
		[
			['"', "'", '<', '>', '&'],
			['&quot;', '&#39;', '&lt;', '&gt;', '&amp;']
		];

	return objectArr.map((item) => {

		var newContent = "";
		var paragraph = item.content;

		for (var i = 0; i < paragraph.length; i++) {

			if (specialCharacters[0].includes(paragraph[i])) {
				var index = specialCharacters[0].indexOf(paragraph[i])
				newContent += specialCharacters[1][index];
			} else {
				newContent += paragraph[i];
			}

		}

		return {
			type: item.type,
			content: newContent
		};

	});

}