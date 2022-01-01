import { useState } from "react";
import axios from "axios";

export default () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState([])

	const onSubmit = async event => {
		event.preventDefault()

		try {
			const response = await axios.post('/api/users/sign-up', { email, password })

			console.log(response.data)
		} catch(err) {
			setErrors(err.response.data.errors)
		}
	}

	return (
		<form action="#" onSubmit={ onSubmit }>
			<h1>Sign Up</h1>

			{
				errors.length > 0 &&
				<div className="alert alert-danger alert-dismissible fade show" role="alert">
					<strong>Oops!</strong>
					<ul className={ 'my-0' }>
						{ errors.map(err => <li key={ err.message }>{ err.message }</li>) }
					</ul>
					<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"/>
				</div>
			}

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