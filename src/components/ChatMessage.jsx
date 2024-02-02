
import './ChatMessage.css'

export function ChatMessage({ username, isSelf = false, color = '#390', children }) {
	return (
		<>
			<div className='messageContainer'>
				<div className={`message ${isSelf ? 'messageSelf' : 'messageOther'}`}>
					<p className='messageName' style={{ color }}>{username}</p>
					<p className='messageText'>{children}</p>
				</div>
			</div>
		</>
	)
}

export function ChatEvent({ children }) {
	return (
		<div className='messageContainer eventContainer'>
			<div className='message messageEvent'>
				<p className='messageText'>{children}</p>
			</div>
		</div>
	)
}
