import { useState } from "react";

export default () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = event => {
		event.preventDefault()

		console.log(email, password)
	}

	return (
		<form action="#" onSubmit={onSubmit}>
			<h1>Sign Up</h1>
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