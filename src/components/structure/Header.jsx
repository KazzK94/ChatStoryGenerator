
import './Header.css'

import Button from '../basics/Button.jsx'

export default function Header({ onTitleClick, children, onLoadDefaultStory }) {
	return (
		<header className='header container'>
			<h1 onClick={onTitleClick}>
				<img src='/csg-logo.png' alt='Chat Story Generator Logo' />
				<span className='titleText'>Chat Story Generator</span>
			</h1>
			<div className='configButtons'>
				<div>
					<Button
						color='#fff'
						backgroundColor='#86bb'
						onClick={() => {
							if (confirm('[SOLO PARA PRUEBAS]\n¿Quieres cargar el texto de ejemplo? Tu texto actual se borrará.')) {
								onLoadDefaultStory()
							}
						}}
					>
						<span className='display-md'>Cargar texto de ejemplo (sólo para pruebas)</span>
						<span className='display-sm-only'>Cargar texto ejemplo</span>
					</Button>
				</div>
			</div>
		</header>
	)
}
