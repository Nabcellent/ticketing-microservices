import 'bootstrap/dist/css/bootstrap.css'
import { buildClient } from "../api/build-client";
import { Component } from "react";

const AppComponent = ({Component, pageProps, currentUser}) => {
	return (
		<div>
			<h1>Header</h1>
			<Component {...pageProps}/>
		</div>
	)
}

AppComponent.getInitialProps = async({ Component, ctx }) => {
	const client = buildClient(ctx)
	const { data } = await client.get('/api/users/current-user')

	let pageProps = {};
	if(Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx)
	}

	return data
}

export default AppComponent