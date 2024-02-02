
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
// import { ChatMessage, ChatEvent } from './components/ChatMessage'

// Services
import { parseStory, textareaPlaceholder } from './services/helpers'
import { ChatEvent, ChatMessage } from './components/ChatMessage'


function App() {

	const chatRef = useRef()
	const rawInputTextAreaRef = useRef()
	const imageExportsRef = useRef()

	const stepsToDevMode = useRef(7)

	// Base Information (Group & MC info)
	const [groupName, setGroupName] = useState('')
	const [groupImageUrl, setGroupImageUrl] = useState(defaultGroupImage)
	const [protagonist, setProtagonist] = useState('')
	// Chat height (customizable)
	const [chatHeight, setChatHeight] = useState(700)
	const [chatFullHeight, setChatFullHeight] = useState(false)
	// Dev Mode
	const [devMode, setDevMode] = useState(false)

	// Story data (array of messages and events)
	const [storyData, setStoryData] = useState([])

	// Error Log
	const [errors, setErrors] = useState([])

	const handleGroupNameInputChange = (event) => {
		const newGroupName = event.target.value
		setGroupName(newGroupName)
	}

	const handleProtagonistChange = (event) => {
		const newProtagonistName = event.target.value
		setProtagonist(newProtagonistName)
	}

	const handleChatHeightChange = (event) => {
		const newChatHeight = Number(event.target.value)
		setChatHeight(newChatHeight)
	}

	const handleToggleChatFullHeight = () => {
		setChatFullHeight(!chatFullHeight)
	}

	const handleStepUpTowardsDevMode = () => {
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

	const handleParseStory = () => {
		const rawInput = rawInputTextAreaRef.current.value
		const newStoryData = parseStory({
			rawInput,
			protagonist
		})
		setErrors(newStoryData.errors)
		setStoryData(newStoryData.story)
	}

	return (
		<>
			<h1 onClick={handleStepUpTowardsDevMode}>Chat Story Generator</h1>
			<hr />

			<div className='outerContainer'>
				{/* LADO IZQUIERDO (form) */}
				<section className='storyInput'>
					<h2>Input para la historia</h2>
					<p>
						<b>Nombre del grupo:</b>
						&nbsp;&nbsp;
						<input id='input-group-title' type='text' value={groupName} onChange={handleGroupNameInputChange} placeholder='Nombre del Grupo' />
					</p>
					<p>
						<b>Protagonista (opcional):</b>
						&nbsp;&nbsp;
						<input id='input-main-character' type='text' value={protagonist} onChange={handleProtagonistChange} placeholder='Helen' />
					</p>
					<p>
						<b>Altura del chat (en px):</b>
						&nbsp;&nbsp;
						<input id='chat-height' type='number' value={chatHeight} onChange={handleChatHeightChange} placeholder='700' disabled={chatFullHeight} />
						<br />
						<label>
							<input type='checkbox' name='fullHeight' value={chatFullHeight} onClick={handleToggleChatFullHeight} /> Mostrar conversación completa (altura máxima)
						</label>
					</p>
					<p>
						<b>Cambiar imagen del grupo:</b> &nbsp; <input onChange={handleGroupImageChange} type='file' />
					</p>

					<textarea
						id='story'
						ref={rawInputTextAreaRef}
						placeholder={textareaPlaceholder}
					/>

					<button id='convert' onClick={handleParseStory} className='btn btn-primary'>Convertir a chat</button>
					&nbsp;&nbsp;
					<button
						id='loadDefaultText'
						className='btn btn-secondary'
						onClick={() => {
							if (confirm('¿Quieres cargar el texto de ejemplo? Tu texto actual se borrará.')) {
								rawInputTextAreaRef.current.value = textareaPlaceholder
								setGroupName('Cómo entrenar a tu Pokémon')
								setTimeout(() => {
									alert('Texto cargado. Recuerda "Convertir a chat" antes de exportarlo a imagen.')
								}, 200)
							}
						}}
					>
						Cargar texto de ejemplo
					</button>
				</section>


				{/* LADO DERECHO (preview) */}
				<section>
					{/* CHAT */}
					<div className='chatOutput' ref={chatRef}>
						<div className='chatHeader'>
							<img className='groupImage' src={groupImageUrl} />
							<p className='groupName'>{groupName}</p>
						</div>

						<div id='conversationContainer' className='conversationContainer' style={{ height: chatFullHeight ? 'auto' : chatHeight }}>
							{
								storyData.map((messageOrEvent, index) => {
									return messageOrEvent.type === 'message'
										? (
											<ChatMessage
												key={`message-${index}`}
												username={messageOrEvent.username}
												isSelf={messageOrEvent.username === protagonist}
												color={messageOrEvent.color}
											>
												{messageOrEvent.message}
											</ChatMessage>
										)
										: messageOrEvent.type === 'event'
											? (
												<ChatEvent key={`event-${index}`}>
													{messageOrEvent.message}
												</ChatEvent>
											)
											: null
								})
							}
						</div>
					</div>

					<button type='button' className='btn btn-dark exportToImage' onClick={handleExportToImage}>Exportar a Imagen</button>
				</section>
			</div>


			<br /><br />
			<br /><br />

			<hr />


			{/* PARTE INFERIOR (ERRORES) */}
			{
				devMode && (
					<div className='outerContainer'>
						<div>
							<h2>SYNTAX ERRORS</h2>
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
		</>
	)
}


export default App
