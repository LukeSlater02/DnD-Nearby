import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = ({setAuthUser}) => {
	const [loginUser, setLoginUser ] = useState({ email: "" });
	const [existDialog, setExistDialog] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const newUser = { ...loginUser };
		newUser[event.target.id] = event.target.value;
		setLoginUser(newUser);
	};

	 const existingUserCheck = () => {
		return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
			.then((res) => res.json())
			.then((user) => (user.length ? user[0] : false));
	};

	const handleLogin = (e) => {
		e.preventDefault();

		existingUserCheck().then((exists) => {
			if (exists) {
				setAuthUser(exists)
				navigate("/home");
			} else {
				setExistDialog(true);
			}
		});
	};

	return (
		<main className="container--login">
			<dialog className="dialog dialog--auth" open={existDialog}>
				<div>User does not exist</div>
				<button
					className="button--close"
					onClick={(e) => setExistDialog(false)}
				>
					Close
				</button>
			</dialog>
			<section className="dragon-img"></section>
			<section >
				<form className="form--login" onSubmit={handleLogin}>
					<fieldset>
						<input
							type="email"
							id="email"
							className="form-control"
							placeholder="Email address"
							required
							autoFocus
							value={loginUser.email}
							onChange={handleInputChange}
						/>
					</fieldset>
					<fieldset>
						<button type="submit">Sign In</button>
					</fieldset>
				</form>
			</section>
			<section className="link--register"> <br></br>
				<Link to="/register">Register for an account</Link>
			</section>
		</main>
	);
};