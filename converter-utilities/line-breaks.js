/* Find break lines */

export default function findLineBreaks(objectArray) {

	return objectArray.map(object => {
		if (object.content[0] !== "-") {
			return object;
		}

		for (var i = 0; i < object.content.length; i++) {
			if (object.content[i] !== "-") {
				return object;
			}
		}

		return {
			type: 'hr',
			content: ""
		};

	});
}