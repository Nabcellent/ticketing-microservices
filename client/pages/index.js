import {buildClient} from "../api/build-client";

const Home = ({ currentUser }) => {
	return currentUser ? <h1>Signed In</h1> : <h2>Not signed In</h2>
}

Home.getInitialProps = async(context) => {
	const client = buildClient(context)
	const { data } = await client.get('/api/users/current-user')

	return data
}

export default Home