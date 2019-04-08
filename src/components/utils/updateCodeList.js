import codes from '../globals'

// put here your token
const token = ''

/** 
 * @function updateCodeList 
 * is for updating code list
 * if there are some changes
 */
const updateCodeList = () => {

	const sidebarCodes = []
	const mainPlaceTab = []

	codes.forEach((code, idx) => {

		sideBarDraw( code, idx, sidebarCodes )
		mainPlaceDraw( code, idx, mainPlaceTab )

	})

	$('.Sidebar-codeList')[0].innerHTML = sidebarCodes.join('')
	
}

/**
 * 
 * @param {*} code each element of codes
 * @param {*} idx idx of this elems
 * @param {*} sidebarCodes array of all sidebar ell
 */
const sideBarDraw = ( code, idx, sidebarCodes ) => {

	/**
	 * @member {parsedCode} 
	 * necessary for displaying code element in sidebar
	 * can be modyfied and displayed as script
	 */
	const parsedCode = code.replace(/</, '&#x3C;')

	sidebarCodes.push( `
		<div 
		id=${idx}
		class='Sidebar-CodeElem'
		onclick='deleteElement(${idx})'}>
		${parsedCode}
		</div>
	`)
}

/**
 * 
	*@param {*} code each element of codes
 * @param {*} idx idx of this elems
 * @param {*} mainPlaceTab array of all mainPlace ell
 */
const mainPlaceDraw = async ( code, idx, mainPlaceTab ) => {
	
	const { user, dataUpdate } = getCodeData( code )
	const requestData = await gitRequest( user, dataUpdate )
	const element = await buldTab( requestData, user )

	mainPlaceTab.splice(idx, 0, element)

	/**
	 * to be shure of sequence
	 */
	$('.MainPlace-list').empty()

	mainPlaceTab.forEach( tab => {

		$(tab).appendTo('.MainPlace-list')
	})
	
}

/**
 * 
 * @function getCodeData 
 * is for getting user name
 * and date
 */
const getCodeData = ( code ) => {

	let user = code.substring( code.indexOf('data-user=') + 11, code.length)
	user = user.substring(0, user.indexOf('"') )

	const  dataUpdate = code.substring( code.indexOf('data-update=') + 13, code.lastIndexOf('"') )

	return { user, dataUpdate}
}

/**
 * @function gitRequest can be sutrukturized
 * get data from response 
 * return filtered data
 * @param {*} user username
 * @param {*} dataUpdate udateDate
 */
const gitRequest = async ( user, dataUpdate ) => {

	const dateUpdateInMs = new Date( dataUpdate ).getTime()
	const url =`https://api.github.com/users/${user}/repos`

	try{

		/**
		 * if there is no token
		 * just shoot standar request
		 * with standart limits
		 */
		let auth = null
		if( token ){

			auth = {
				method: 'GET',
				headers: {
					'Authorization': `token ${token}`
				}
			}
		}

		const response = await fetch(url, auth);

		/**
		 * error handling
		 */
		if( response.status !== 404 ){

			let myJson = await response.json(); //extract JSON from the http response
			myJson = myJson.filter( repo => {
		
				const repoUpdateDateinMs = new Date(repo.updated_at).getTime()
			
				if( repoUpdateDateinMs <= dateUpdateInMs){

					return true
				} 
			})

			/**
			 * error handling
			 */
			if( !myJson.length ) return  {

				err: 'No such date'
			}

			//filtered json by data
			return myJson
		} 

		/**
		 * error handling
		 */
		return  {

			err: 'No such user'
		}
	} catch (e) {
		/**
		 * error handling
		 */
		return {err: e.message}
	}

}

/**
 * 
 * @param {*} data data from filtered response
 * @function buildTab is for parsing json to html
 */
function buldTab( data, user ){
	
	let repotab = ''

	if( !data.err ){

		let parsedData = data.map( repo => {
			
			let description = 'No Description'

			if( repo.description ){

				description = repo.description
			}
	
			return `
				<tr>
				<td>${repo.name}</td>
				<td>${description}</td>
				<td>${repo.updated_at}</td>
				<td>${repo.git_url}</td>
				</tr>
				`
		})
	
		parsedData = parsedData.join(' ')
		
		repotab = `
			<div class="MainPlace-tabPlace">
				<div class="MainPlace-userName">${user}</div>
				<table >
					<tr>
						<th>Repository</th>
						<th>Description</th>
						<th>Last update</th>
						<th>URL</th>
					</tr>
					${parsedData}
				</tab>
			</div>
		`

	} else {

		/**
		 * error handling
		 */
		repotab = `<div class="MainPlace-tabPlace MainPlace-err">${data.err}: ${user}</div>`
	}

	return repotab
}

export default updateCodeList