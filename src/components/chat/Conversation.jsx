
import { ChatEvent, ChatMessage } from './ChatMessage'
import './Conversation.css'

export default function Conversation({ height, storyData, protagonist, chatRef, groupImageUrl, groupName, children }) {

	const handleImageClick = (event) => {
		document.getElementById('changeGroupImage').click()
	}

	return (
		<div className='chatOutput' ref={chatRef}>
			<div className='chatHeader'>
				<img className='groupImage' src={groupImageUrl} onClick={handleImageClick} />
				<p className='groupName'>{groupName}</p>
			</div>

			<div id='conversationContainer' className='conversationContainer' style={{ height }}>
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

	)
}
