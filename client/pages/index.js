import axios from "axios";

const Home = ({ currentUser }) => {
	console.log(currentUser)

	return <h1>Landing page</h1>
}

Home.getInitialProps = async({ req }) => {
	let response;
	if(typeof window === 'undefined') {
		// Request being made from server url should be as follows [http://SERVICENAME.NAMESPACE.svc.cluster.local]
		response = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user', {
			headers: req.headers
		})
	} else {
		response = await axios.get('/api/users/current-user')
	}

	return response.data
}

export default Home