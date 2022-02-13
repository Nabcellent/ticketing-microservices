import {useRequest} from "../../hooks/use-request";
import Router from "next/router";
import {useEffect} from "react";

export default () => {
	const { sendRequest, errors } = useRequest({
		url: '/api/users/sign-out',
		method: 'post',
		body: {},
		onSuccess: () => Router.push('/')
	})

	useEffect(async() => {
		await sendRequest()
	}, [])

	return <div>Signing you out...</div>
}