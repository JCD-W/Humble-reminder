import { createContext } from "react";
import { checkLogin } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const SessionContext = createContext()

const SessionProvider = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(["session-token", "refresh-token"]);

	const isLogged = async () => {
		return await checkLogin()
	}

	const logOff = async () => {
		removeCookie("refresh-token")
		removeCookie("session-token")
	}

	return (
		<SessionContext.Provider
			value={{
				isLogged,
				logOff
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

export {
	SessionContext,
	SessionProvider
}