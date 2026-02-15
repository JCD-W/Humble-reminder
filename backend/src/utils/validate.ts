const validateString = (str: string, length: number = 8, pattern = /^([ñA-Za-z0-9\*\s_]){0,}$/i): boolean => {
	if (str.length <= length)
		return false

	return pattern.test(str)
}

export {
	validateString
}