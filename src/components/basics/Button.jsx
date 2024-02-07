
import './Button.css'

export default function Button({ children, className, color, backgroundColor, onClick }) {
	return (
		<button style={{ color, backgroundColor, borderColor: backgroundColor }} className={`button ${className}`} onClick={onClick}>
			{children}
		</button>
	)
}
