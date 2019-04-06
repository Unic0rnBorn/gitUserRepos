import $ from 'npm-zepto'
import codes from '../../globals'
import codeInValid from '../../utils/codeInValid'
import updateCodeList from '../../utils/updateCodeList'

const create = () => {

	const sidebar = `
		<div class='Sidebar'>
			<div class='Sidebar-inputBlock'>
				<div class='Sidebar-label'>
					Sidebar
				</div>
				<div class='Sidebar-inputDefinition'>
					<input 
						placeholder='Write here tag'
						class='Sidebar-input' 
						type='text'/>
					<div class='Sidebar-addButton'>Add</div>
				</div>
				<div class='Sidebar-example'>
					Example: &#x3C;repos data-user="devballteam" data-update="2018-05-01">
				</div>
				<div class='Sidebar-error'></div>
			</div>
			<div class='Sidebar-codeList'>Here Will be the list of codes</div>
		</div>
	`

	$(sidebar).appendTo('.Body')

	/**
	 * check if codes initialized (hardcoded)
	 */
	if( codes.length ) updateCodeList()

	eventHandler()
}


/**
 * @function {deleteElement} 
 * handling delete code
 */
const deleteElement = ( idx ) => {

	codes.splice(idx, 1)
	updateCodeList()
}


/**
 * global declaration of function (webpack)
 */
window.deleteElement = deleteElement


const eventHandler = () => {

	$('.Sidebar-addButton').on('click', () => {

		/**
		 * @member {value} 
		 * deleting free spaces from around
		 * replacing chars to simplify algorythms
		 */
		let value = $('.Sidebar-input')[0].value.trim()
		value = value.replace(/'/, /"/)

		if (!codeInValid(value)) {
		
			if (codes.length && codes.includes(value)) {

				/**
				 * error handler
				 */
				return $('.Sidebar-error')[0].innerHTML = 'Codes must be uniq'
			}
			codes.push(value)

			updateCodeList()

		} else $('.Sidebar-error')[0].innerHTML = codeInValid(value)
	
	})
}




export default { create }