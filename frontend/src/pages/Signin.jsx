import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { SubmitButton } from "../components/SubmitButton";
import { BottomWarning } from "../components/BottomWarning";

const Signin = () => {
	return (
		<div className="bg-gray-300 h-screen flex justify-center">
			<div className="flex justify-center flex-col">
				<div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
					<Heading label={"Sign In"} />
					<SubHeading label={"Enter your login credentials!!"} />
					<InputBox
						label={"Email"}
						placeholder={"Enter your email"}
						type="email"
					/>
					<InputBox
						label={"Password"}
						placeholder={"Enter your password"}
						type="password"
					/>
					<SubmitButton label={"Sign In!"} />
					<BottomWarning
						label={"Doesn't have an account?"}
						buttonText={"Sign Up"}
						to={"/signup"}
					/>
				</div>
			</div>
		</div>
	);
};

export default Signin;
