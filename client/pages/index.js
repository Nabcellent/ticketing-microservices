const Home = ({ currentUser }) => {
	return currentUser ? <h1>Signed In</h1> : <h2>Not signed In</h2>
}

Home.getInitialProps = async(context, client, currentUser) => {
	return {}
}

export default Home