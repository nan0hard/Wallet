import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { SubmitButton } from "../components/SubmitButton";

const Signup = () => {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onClickHandler = async (e) => {
		e.preventDefault();

		const response = await axios.post(
			"http://localhost:4000/api/v1/user/signup",
			{
				firstName,
				lastName,
				email,
				password,
			}
		);

		localStorage.setItem("token", response.data.token);

		Navigate("/dashboard");
	};

	return (
		<div className="bg-gray-300 h-screen flex justify-center">
			<div className="flex  justify-center flex-col">
				<div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
					<Heading label={"Sign Up"} />
					<SubHeading
						label={"Enter the required information to create an account!"}
					/>
					<InputBox
						label={"First Name"}
						placeholder={"Enter your First Name"}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<InputBox
						label={"Last Name"}
						placeholder={"Enter your Last Name"}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<InputBox
						label={"Email"}
						placeholder={"Enter your email address"}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<InputBox
						label={"Password"}
						placeholder={"Enter your password"}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<SubmitButton label={"Sign up!"} onClick={onClickHandler} />

					<BottomWarning
						label={"Already have an account?"}
						buttonText="Sign In"
						to={"/signin"}
					/>
				</div>
			</div>
		</div>
	);
};

export default Signup;
