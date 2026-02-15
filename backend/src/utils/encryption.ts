import crypto  from "crypto"

const IV = Buffer.from(process.env.ENCRYPTION_IV || "bad placeholder.")
const KEY = Buffer.from(process.env.ENCRYPTION_KEY || "bad placeholder.")

const encryptPass = (pass: string) => {
	const cipher = crypto.createCipheriv('aes-128-cbc', KEY, IV)
	const encrypted = cipher.update(pass, 'utf-8', 'base64')
	return Buffer.from(encrypted + cipher.final('base64'))
}

export {
	encryptPass
}