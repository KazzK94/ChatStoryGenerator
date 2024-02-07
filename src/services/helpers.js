
const COLOR_SELF = '#069065'
const colors = ['#2980c9', '#e39c42', '#8e44ad', '#cc3e50']
const characters = []

// function assigned to <button id='convert'>
// eslint-disable-next-line no-unused-vars
export function parseStory({ protagonist, rawInput }) {

	// Split raw input into lines
	const storyLines = rawInput.trim().split('\n')

	// Initialize jsonOutput and errorsOutput arrays
	const jsonOutput = []
	const errorsOutput = []

	// Loop through every line
	storyLines.forEach(function (line, index) {
		// Trim the line (just in case)
		line = line.trim()

		// Check if it's an Event (instead of a message)
		if (line[0] === '*' && line[line.length - 1] === '*') {
			// EVENT
			const event = line.substr(1).slice(0, -1)
			jsonOutput.push({
				type: 'event',
				message: event
			})
			return
		}
		// Check if it's a Message (a character speaking)
		if (~line.indexOf(': ') && line.indexOf(': ') !== line.length - 1 && line.indexOf(':') !== 0) {
			// Split message by the ':' to find the name at the left
			line = line.split(': ')
			// Obtain the username (and remove it from the array)
			const username = line.shift()
			// Message = array joining by ':' just in case the message contained some colon
			const message = line.join(': ').trim()

			// Check if it's the protagonist
			const isProtagonist = username === protagonist

			// If the character hasn't been stored (and it's not the MC), store it
			if (!isProtagonist && !~characters.indexOf(username)) {
				characters.push(username)
			}

			// Decide color
			const color = isProtagonist ? COLOR_SELF : colors[characters.indexOf(username) % colors.length]

			// And push it into the JSON file
			jsonOutput.push({
				type: 'message',
				username,
				message,
				color
			})
		} else {
			// INVALID LINE
			errorsOutput.push({
				line: index + 1,
				lineFromBottom: storyLines.length - index,
				text: line
			})
		}
	})

	return {
		story: jsonOutput,
		errors: errorsOutput,
		characters
	}

}

export const textareaPlaceholder = `Ron: Venga, vamos a practicar unos leviosás.
Hermione: Es "leviosa", no "leviosá". Te lo tengo dicho...
Harry: Eh, Ron, haz caso a Hermione. Yo una vez dije mal el nombre de un callejón y por poco no lo cuento.
Ron: ¿En serio? ¿Por trabarte?
Harry: ¡¡Pero si tú también estabas!! ¿No te acuerdas? El "callejondigón".
Ron: JAJAJAJAJAJA ay, ya me he acordado. Tío, es que... ¡Es el Callejón Diagón! Mira que era fácil.
Hermione: Dijo el del "leviosá"...
*Ron resopla contundentemente.*
Harry: Venga, arriba esas varitas. ¡A practicar!
Hermione: ¡Ya era hora!`

export const protagonistPlaceholder = 'Harry'

export const groupNamePlaceholder = 'Escuela de majos'
