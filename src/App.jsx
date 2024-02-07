
// Assets (images, styles...)
import defaultGroupImage from './assets/defaultGroupImage.png'
import './App.css'

// Libraries
import html2canvas from 'html2canvas'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Hooks
import { useRef, useState } from 'react'

// Components
import Conversation from './components/chat/Conversation.jsx'
import FormField from './components/form/FormField.jsx'
import Header from './components/structure/Header.jsx'
import Button from './components/basics/Button.jsx'

// Services
import { parseStory, textareaPlaceholder, protagonistPlaceholder, groupNamePlaceholder } from './services/helpers.js'


function App() {

	const chatRef = useRef()
	const [rawInput, setRawInput] = useState('')
	const imageExportsRef = useRef()

	const stepsToDevMode = useRef(7)

	// Base Information (Group & MC info)
	const [groupName, setGroupName] = useState('')
	const [groupImageUrl, setGroupImageUrl] = useState(defaultGroupImage)
	const [protagonist, setProtagonist] = useState('')
	// Chat height (customizable)
	const [chatHeight, setChatHeight] = useState(700)
	const [chatIsFullHeight, setChatFullHeight] = useState(false)
	// Dev Mode
	const [devMode, setDevMode] = useState(false)

	// Story data (array of messages and events)
	const [storyData, setStoryData] = useState([])

	// Error Log
	const [errors, setErrors] = useState([])

	const handleLoadDefaultStory = () => {
		setRawInput(textareaPlaceholder)
		setGroupName(groupNamePlaceholder)
		setProtagonist(protagonistPlaceholder)
		handleParseStory({ newRawInput: textareaPlaceholder })
	}

	const handleGroupNameInputChange = (event) => {
		const newGroupName = event.target.value
		setGroupName(newGroupName)
		return false
	}

	const handleProtagonistChange = (event) => {
		const newProtagonist = event.target.value
		setProtagonist(newProtagonist)
		handleParseStory({ newProtagonist })
		return false
	}

	const handleRawInputChange = (event) => {
		const newRawInput = event.target.value
		setRawInput(newRawInput)
		handleParseStory({ newRawInput })
		return false
	}

	const handleChatHeightChange = (event) => {
		const newChatHeight = Number(event.target.value)
		setChatHeight(newChatHeight)
		return false
	}

	const handleToggleChatFullHeight = () => {
		setChatFullHeight(!chatIsFullHeight)
		return false
	}

	const handleGroupImageChange = (event) => {
		// Create a FileReader (to read an image)
		const reader = new FileReader()
		// When it loads (async) set the new group image
		reader.onload = function () {
			// Set Group image
			setGroupImageUrl(reader.result)
		}
		// This will read data async, and once done it'll trigger the above function "onload"
		reader.readAsDataURL(event.target.files[0])
	}

	const handleStepUpTowardsDevMode = () => {
		if (devMode) return false
		stepsToDevMode.current -= 1
		if (stepsToDevMode.current <= 0) {
			setDevMode(true)
			alert('¡Has habilitado el modo desarrollador/a!')
		}
	}

	const handleExportToImage = () => {
		if (!groupName) {
			toast.error('ERROR: No has dado ningún nombre al grupo de chat.', {
				position: 'bottom-right',
				autoClose: 3000,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				theme: 'light'
			})
			return
		}
		html2canvas(chatRef.current).then(canvas => {
			const div = document.createElement('div')
			div.appendChild(canvas)
			div.style.textAlign = 'center'
			div.addEventListener('dblclick', (event) => {
				if (event.ctrlKey) {
					div.remove()
				}
			})
			imageExportsRef.current.appendChild(div)
			toast.info('🖼️ ¡Se ha generado una imagen nueva con este chat! (ver abajo)', {
				position: 'bottom-right',
				autoClose: 3000,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				theme: 'light'
			})
		})
	}

	const handleParseStory = ({ newRawInput, newProtagonist }) => {
		const newStoryData = parseStory({
			rawInput: newRawInput || rawInput,
			protagonist: newProtagonist || protagonist
		})
		setErrors(newStoryData.errors)
		setStoryData(newStoryData.story)
	}

	return (
		<>
			<Header
				onTitleClick={handleStepUpTowardsDevMode}
				onLoadDefaultStory={handleLoadDefaultStory}
			>
				Chat Story Generator
			</Header>

			<main className='container'>
				<div className='outerContainer grid-lg-1-auto gap-32'>
					{/* LADO IZQUIERDO (form) */}
					<section className='storyInput'>
						{/* Hidden input to handle the Group Image change (when clicking on the image in the chat header) */}
						<input id='changeGroupImage' className='hidden' onChange={handleGroupImageChange} type='file' />

						<fieldset>
							<div className='grid-lg-2 grid-xl-3 gap-20'>
								<FormField id='groupId' title='Nombre del grupo' value={groupName} onChange={handleGroupNameInputChange} placeholder='Grupo de amigos' />
								<FormField id='protagonist' title='Protagonista' value={protagonist} onChange={handleProtagonistChange} placeholder='Harry Potter' />
								<FormField id='chatHeight' title='Altura del chat (en px)' value={chatHeight} onChange={handleChatHeightChange} disabled={chatIsFullHeight} />
							</div>
							<FormField type='checkbox' id='fullHeightToggle' title='Mostrar conversación completa (altura automática)' value={chatIsFullHeight} onChange={handleToggleChatFullHeight} />
						</fieldset>

						<fieldset>
							<FormField
								type='textarea'
								id='story'
								value={rawInput}
								placeholder={textareaPlaceholder}
								onChange={handleRawInputChange}
								containerStyle={{ height: '100%', paddingBottom: '20px' }}
							/>
						</fieldset>
					</section>


					{/* RIGHT SIDE (preview) */}
					<section className='chatPreview center-content'>
						{/* Conversation (all chat here) */}
						<Conversation
							height={chatIsFullHeight ? 'auto' : chatHeight}
							protagonist={protagonist}
							storyData={storyData}
							chatRef={chatRef}
							groupImageUrl={groupImageUrl}
							groupName={groupName}
						/>
						{/* Button to export chat html to image */}
						<Button type='button' className='exportToImage' onClick={handleExportToImage}>Exportar a Imagen</Button>
					</section>
				</div>


				<br /><br />
				<br /><br />

				{devMode && <hr />}


				{/* PARTE INFERIOR (ERRORES) */}
				{
					errors && errors.length > 0 && (
						<div>
							<h2>ERRORES DE SINTAXIS</h2>
							<div className='errorLog'>
								<ul>
									{
										errors.map((inputError, index) => {
											return (
												<li key={`error-${index}`}>
													Error de sintaxis en la <b>Línea {inputError.line} (la {inputError.lineFromBottom}ª desde abajo)</b>:
													"{inputError.text || '(línea vacía)'}"
												</li>
											)

										})
									}
								</ul>
							</div>
						</div>
					)
				}

				{devMode && <hr />}

				{/* PARTE INFERIOR (output JSON) */}
				{
					devMode && (
						<div style={{ textAlign: 'center' }}>
							<h2>JSON Output</h2>
							<div>{JSON.stringify(storyData)}</div>
						</div>
					)
				}

				<hr />

				<div className='imageExports' ref={imageExportsRef} />

				<ToastContainer />
			</main>
		</>
	)
}


export default App
