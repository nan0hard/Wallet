import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
	const [amount, setAmount] = useState("");
	const [searchParams] = useSearchParams();

	const to = searchParams.get("id");
	const name = searchParams.get("name");

	const clickHandler = () => {
		axios.post(
			"http://localhost:4000/api/v1/account/transferMoney",
			{
				to,
				amount,
			},
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			}
		);
	};

	return (
		<>
			<div className="bg-gray-300 h-screen flex justify-center">
				<div className="flex justify-center flex-col">
					<div className="rounded-lg bg-white max-w-96 text-center p-6 h-max px-4">
						<div className="text-4xl font-bold py-6 px-16">Send Money</div>

						<div className="flex justify-start items-center mt-10">
							<div className="rounded-full w-14 h-14 bg-green-500 text-white flex justify-center">
								<div className="flex justify-center items-center text-2xl font-semibold">
									{name[0].toUpperCase()}
								</div>
							</div>

							<div className="ml-2 text-xl">{name}</div>
						</div>
						<div className="flex justify-start m-2">Amount(in $):</div>

						<input
							className="border w-full my-4 rounded-md p-2"
							placeholder="Enter amount"
							onChange={(e) => setAmount(e.target.value)}
						/>

						<div>
							<button
								className="bg-green-500 text-white p-3 w-full rounded-lg text-2xl font-semibold"
								onClick={clickHandler}
							>
								Initiate Transfer
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SendMoney;
