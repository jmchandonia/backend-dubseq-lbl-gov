export default function reportWebVitals(metric) {
	if (metric.label === 'web-vital') {
	  console.log(metric) // The metric object ({ id, name, startTime, value, label }) is logged to the console
	}
  }