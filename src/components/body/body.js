import sidebar from './sidebar/sidebar'
import mainPlace from './main-place/main-place'
import $ from 'npm-zepto'

const codes = sidebar.codes

const create = () => {

	const body = `
		<div class="Body"></div>
	`
	/**
	 * one place for render
	 */
	$(body).appendTo('body')
	sidebar.create( codes )
	mainPlace.create( )
	
}



export default {
	create: create
}