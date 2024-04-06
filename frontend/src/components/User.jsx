import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const User = ({ user }) => {
	const navigate = useNavigate();

	return (
		<div className="flex justify-between mt-6 items-center">
			<div className="flex items-center">
				<div className="rounded-full h-12 w-12 bg-gray-300 flex justify-center items-center">
					<div className="flex flex-col items-center justify-center text-2xl">
						{user.firstName[0].toUpperCase()}
					</div>
				</div>
				<div className="ml-2 text-xl">
					{user.firstName} {user.lastName}
				</div>
			</div>
			<div>
				<button
					className="bg-black text-white rounded-md p-2"
					onClick={() =>
						navigate(`/send?id=${user._id}&name=${user.firstName}`)
					}
				>
					Send Money
				</button>
			</div>
		</div>
	);
};
