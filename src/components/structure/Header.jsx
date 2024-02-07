
import './Header.css'

import Button from '../basics/Button.jsx'

export default function Header({ onTitleClick, children, onLoadDefaultStory }) {
	return (
		<header className='header container'>
			<h1 onClick={onTitleClick}>
				<img src='/csg-logo.png' alt='Chat Story Generator Logo' />
				Chat Story Generator
			</h1>
			<div className='configButtons'>
				<div>
					<Button
						color='#fff'
						backgroundColor='#86bb'
						onClick={() => {
							if (confirm('¿Quieres cargar el texto de ejemplo? Tu texto actual se borrará.')) {
								onLoadDefaultStory()
							}
						}}
					>
						Cargar texto de ejemplo (sólo para pruebas)
					</Button>
				</div>
			</div>
		</header>
	)
}
