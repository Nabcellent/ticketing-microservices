import axios from "axios";

const Home = ({ currentUser }) => {
	console.log(currentUser)

	return <h1>Landing page</h1>
}

Home.getInitialProps = async() => {
	const response = await axios.get('/api/users/current-user')

	return response.data
}

export default Home