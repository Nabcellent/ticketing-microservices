import { buildClient } from "../api/build-client";

const Home = ({ currentUser }) => {
	console.log(currentUser)

	return <h1>Landing page</h1>
}

Home.getInitialProps = async(context) => {
	const client = buildClient(context)
	const { data } = await client.get('/api/users/current-user')

	return data
}

export default Home