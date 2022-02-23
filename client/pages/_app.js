import 'bootstrap/dist/css/bootstrap.css';
import {buildClient} from "../api/build-client";
import {Component} from "react";
import {Header} from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Header currentUser={ currentUser }/>
			<Component { ...pageProps } currentUser={currentUser}/>
		</div>
	)
}

AppComponent.getInitialProps = async({ Component, ctx }) => {
	const client = buildClient(ctx)
	const { data } = await client.get('/api/users/current-user')

	let pageProps = {};
	if(Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx, client, data.currentUser)
	}

	return { pageProps, ...data }
}

export default AppComponent