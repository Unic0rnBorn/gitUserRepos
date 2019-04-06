import $ from 'npm-zepto'

/**
 * creating mainSpace
 */
const create = () => {

	const mainPlace = `
		<div class='MainPlace'>
			<div class='MainPlace-list'>
				<p class="MainPlace-placeholder">
					Here will be an information about user
				</p>
			</div>
		</div>
	`

	$(mainPlace).appendTo('.Body')

}


export default { create }