import { useState } from "react";
import { useRequest } from "../../hooks/use-request";
import Router  from "next/router";

export default () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { sendRequest, errors } = useRequest({
		url: '/api/users/sign-up',
		method: 'post',
		body: { email, password },
		onSuccess: () => Router.push('/')
	})

	const onSubmit = async event => {
		event.preventDefault()

		await sendRequest()
	}

	return (
		<form action="#" onSubmit={ onSubmit }>
			<h1>Sign Up</h1>

			{ errors }

			<div className="mb-3">
				<input type="email" className={ 'form-control' } value={ email } autoFocus
					   onChange={ e => setEmail(e.target.value) } placeholder={ 'Email address' } required/>
			</div>
			<div className="mb-3">
				<input type="password" className={ 'form-control' } value={ password }
					   onChange={ e => setPassword(e.target.value) } placeholder={ 'password' }
					   required/>
			</div>
			<div className={ 'text-end' }>
				<button className={ 'btn btn-primary' }>Sign Up</button>
			</div>
		</form>
	)
}