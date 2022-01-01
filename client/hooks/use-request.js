import { useState } from "react";
import axios from "axios";

export default ({ url, method, body }) => {
	const [errors, setErrors] = useState(null);

	const sendRequest = async() => {
		try {
			const response = await axios[method](url, body);

			return response.data
		} catch(err) {
			setErrors(
				<div className="alert alert-danger alert-dismissible fade show" role="alert">
					<strong>Oops!</strong>
					<ul className={ 'my-0' }>
						{ err.response.data.errors.map(err => <li key={ err.message }>{ err.message }</li>) }
					</ul>
					<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"/>
				</div>
			)
		}
	}

	return { sendRequest, errors }
}