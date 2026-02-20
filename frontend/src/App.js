import "./App.css"

import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./components/pages/session/loginPage"
import LostConnectionPage from "./components/pages/errors/lostConnectionPage"
import BoardsPage from "./components/pages/boards/boardsPage"
import { useState } from "react"
import { checkConnection, checkLogin } from "./api/authApi"
import BoardPage from "./components/pages/boards/boardPage"
import UnauthorizedPage from "./components/pages/errors/unauthorizedPage"
import { MessageProvider } from "./context/messageContext"

const App = () =>  {
	let [finishedChecking, setFinishedChecking] = useState(false)
	let [hasConnection, setHasConnection] = useState(false)

	const checks = async () => {
		const connected = await checkConnection()
		setHasConnection(connected)
		setFinishedChecking(true)
	}

	useState(() => {
		if (!finishedChecking) {
			checks()
		}
	}, [])

	return (
		finishedChecking ?
			<MessageProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={					
							hasConnection ?
								<LoginPage/>
							:
								<LostConnectionPage/>
						}/>
						<Route path="/boards" element={<BoardsPage/>}/>
						<Route path="/board/:id" element={<BoardPage/>}/>
						<Route path="/unauthorized" element={<UnauthorizedPage/>}/>
					</Routes>
				</BrowserRouter>
			</MessageProvider>
		:
			<h1 className="connecting screen-centered">Connecting to the server...</h1>
	)
}

export default App