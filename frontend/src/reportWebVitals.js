import { getLCP } from "web-vitals"

const reportWebVitals = onPerfEntry => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		getLCP((data) => {
			console.log(`Page loaded in ${data.value / 1000} seconds`)
		})
	}
}

export default reportWebVitals