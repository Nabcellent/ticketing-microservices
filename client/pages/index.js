const Home = ({ color }) => {
	console.log(`I am on the component`, color)
	return <h1>Landing page</h1>
}

Home.getInitialProps = () => {
	console.log('I am on the server!')

	return { color: 'red' }
}

export default Home