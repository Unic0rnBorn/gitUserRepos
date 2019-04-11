import './style/style.scss'
import header from './components/header/header'
import bodyCtx from './components/body/body'


const initializeComponents = () => {

	header.create()
	bodyCtx.create()
}

const initApp = () => {
	
	window.codes = []
	initializeComponents()

}

initApp()