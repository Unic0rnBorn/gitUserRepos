import $ from 'npm-zepto'
import Logo from '../../assets/Logo.png'

/**
 * @fonction create is for creating header
 */
const create = () => {

	const header = document.createElement('div')
	const logo = `
		<div  class="Header-logo">
			<a href='https://bogdan-ztmr.wixsite.com/myworkmylife' target="_blank">
				<img src=${Logo} width="50px" height="50px" />
			</a>
		</div>
	`
	const welcome = '<div class="Header-welcome">Welome to my app</div>'

	header.classList.add('Header')
	header.innerHTML = [ logo, welcome ].join(' ')

	$(header).appendTo('body')
	
	return header
}

export default {create}