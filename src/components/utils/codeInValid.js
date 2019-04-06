
/**
 * @function nthIndex
 * useful tool from StackOverflow
 * used for finding an idex 
 * of element in a string
 */
function nthIndex(str, pat, n) {

	var L = str.length,
		i = -1;

	while (n-- && i++ < L) {

		i = str.indexOf(pat, i);
		if (i < 0) break;

	}

	return i;
}

/**
 * 
 * @function codeInValid
 * validate a value
 */
const codeInValid = ( code = '' ) => {

	let err = ''
	
	if ( !code.length ) return 'You should fill input'
	if ( code.indexOf('<repos') !== 0) return 'Only tag <repo can be used'
	if ( !code.match('data-user')) return 'Must have user'
	if ( !code.match('data-update')) return 'MustHaveData'
	if ( code.indexOf('data-user') !== code.lastIndexOf('data-user')) return 'Only one user in attribute'
	if ( code.indexOf('data-update') !== code.lastIndexOf('data-update')) return 'Only one Update in attribute'

	let tempCode = code.substring(6, code.length).trim()
	
	if (tempCode.indexOf('data-update') !== 0 && tempCode.indexOf('data-user') !== 0) return 'Excess data'

	let attrValue = ''

	if (tempCode.indexOf('data-user') === 0) {

		attrValue = tempCode.substring(nthIndex(tempCode, '"', 1) + 1, nthIndex(tempCode, '"', 2))

		/**
		 * Validation of userName
		 */
		if (!/^[A-z0-9-]+$/.test(attrValue)) {

			return 'Invalid user name only A-z 0-9 - chars are allowed'
		}

		tempCode = tempCode.substring(tempCode.indexOf('data-update'), tempCode.length)

		attrValue = tempCode.substring(nthIndex(tempCode, '"', 1) + 1, nthIndex(tempCode, '"', 2))

		/**
		 * date validateion
		 */
		if (!/^[0-9-]+$/.test(attrValue) || !new Date(attrValue) ) {

			return 'Invalid date only 0-9 - chars are allowed'
		}

		tempCode = tempCode.substring(nthIndex(tempCode, '"', 2) + 1, tempCode.length)


		if (!/^[ >]+$/.test(tempCode)) {

			return 'ExcessData'
		}

	} else {

		attrValue = tempCode.substring(nthIndex(tempCode, '"', 1) + 1, nthIndex(tempCode, '"', 2))

		if (!/^[0-9-]+$/.test(attrValue) || !new Date(attrValue)) {

			return 'Invalid date only 0-9 - chars are allowed'
		}

		tempCode = tempCode.substring(tempCode.indexOf('data-user'), tempCode.length)

		attrValue = tempCode.substring(nthIndex(tempCode, '"', 1) + 1, nthIndex(tempCode, '"', 2))

		if (!/^[A-z0-9-]+$/.test(attrValue)) {

			return 'Invalid user name only A-z 0-9 - chars are allowed'
		}

		tempCode = tempCode.substring(nthIndex(tempCode, '"', 2) + 1, tempCode.length)

		if (!/^[ >]+$/.test(tempCode)) {

			return 'Excess data'
		}
	}

	if ($('.Sidebar-error')[0].innerHTML) $('.Sidebar-error')[0].innerHTML = ''

	return false
}

export default codeInValid