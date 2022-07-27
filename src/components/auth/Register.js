import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export const Register = () => {
	const [registerUser, setRegisterUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});
	const [conflictDialog, setConflictDialog] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const newUser = { ...registerUser };
		newUser[event.target.id] = event.target.value;
		setRegisterUser(newUser);
	};

	const existingUserCheck = () => {
		return fetch(`http://localhost:8088/users?email=${registerUser.email}`)
			.then((res) => res.json())
			.then((user) => !!user.length);
	};

	const handleRegister = (e) => {
		e.preventDefault();

		existingUserCheck().then((userExists) => {
			if (!userExists) {
				fetch("http://localhost:8088/users", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: registerUser.email,
						firstNname: registerUser.firstName,
						lastName: registerUser.lastName,
					}),
				})
					.then((res) => res.json())
					.then((createdUser) => {
						if (createdUser.hasOwnProperty("id")) {
							sessionStorage.setItem("nutshell_user", createdUser.id);
							navigate("/");
						}
					});
			} else {
				setConflictDialog(true);
			}
		});
	};

	return (
		<main className="container--register" style={{ textAlign: "center" }}>
			<dialog className="dialog dialog--password" open={conflictDialog}>
				<div>Account with that email address already exists</div>
				<button
					className="button--close"
					onClick={(e) => setConflictDialog(false)}
				>
					Close
				</button>
			</dialog>
			<form className="form--login" onSubmit={handleRegister}>
				<fieldset>
					<label htmlFor="firstName"> First Name </label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						className="form-control"
						placeholder="First name"
						required
						autoFocus
						value={registerUser.firstName}
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="lastName"> Last Name </label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						className="form-control"
						placeholder="Last name"
						required
						value={registerUser.lastName}
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="inputEmail"> Email address </label>
					<input
						type="email"
						name="email"
						id="email"
						className="form-control"
						placeholder="Email address"
						required
						value={registerUser.email}
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset>
					<button type="submit"> Register </button>
				</fieldset>
			</form>
		</main>
	);
};
