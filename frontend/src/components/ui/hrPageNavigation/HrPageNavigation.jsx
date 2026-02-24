import "./hrPageNavigation.css"

import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const HrPageNavigation = ({ pages=0, page=0, isForMobile, isForDesktop, onPageChange }) => {
	const previous = () => {
		if (page > 1)
			onPageChange(page - 2)
	}

	const next = () => {
		if (page < pages)
			onPageChange(page)
	}

	return (
		<footer className={`page-navigation-container ${isForMobile && "page-navigation-mobile"} ${isForDesktop && "page-navigation-desktop"}`}>
			<button
				className="page-navigation-button"
				onClick={() => previous()}
			>
				<FaAngleLeft size={24}/>
			</button>
			<span className="page-navigation">{page} / {pages}</span>
			<button 
				className="page-navigation-button"
				onClick={() => next()}
			>
				<FaAngleRight size={24}/>
			</button>
		</footer>
	)
}

export default HrPageNavigation