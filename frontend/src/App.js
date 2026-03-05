import "./App.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { CookiesProvider } from "react-cookie"

import LoginPage from "./components/pages/session/loginPage"
import LostConnectionPage from "./components/pages/errors/lostConnectionPage"
import BoardsPage from "./components/pages/boards/boardsPage"
import { checkConnection } from "./api/authApi"
import BoardPage from "./components/pages/boards/boardPage"
import UnauthorizedPage from "./components/pages/errors/unauthorizedPage"
import { MessageProvider } from "./context/messageContext"
import PageNotFound from "./components/pages/errors/pageNotFound"
import ChangePassPage from "./components/pages/session/changePassPage"
import { SessionProvider } from "./context/sessionContext"

const App = () =>  {
	let [finishedChecking, setFinishedChecking] = useState(false)
	let [hasConnection, setHasConnection] = useState(false)

	const checks = async () => {
		const connected = await checkConnection()
		setHasConnection(connected)
		setFinishedChecking(true)
	}

	useEffect(() => {
		if (!finishedChecking) {
			checks()
		}
	}, [])

	return (
		finishedChecking ?
			<CookiesProvider>
				<SessionProvider>
					<MessageProvider>
						<BrowserRouter>
							<Routes>
								<Route path="/" element={					
									hasConnection ?
										<LoginPage/>
									:
										<LostConnectionPage/>
								}/>
								<Route path="/change-pass" element={<ChangePassPage/>}/>
								<Route path="/boards" element={<BoardsPage/>}/>
								<Route path="/board/:id" element={<BoardPage/>}/>
								<Route path="/unauthorized" element={<UnauthorizedPage/>}/>
								<Route path="*" element={<PageNotFound/>}/>
							</Routes>
						</BrowserRouter>
					</MessageProvider>
				</SessionProvider>
			</CookiesProvider>
		:
			<h1 className="connecting screen-centered">Connecting to the server...</h1>
	)
}

export default App