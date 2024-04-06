import { useEffect, useState } from "react";
import { User } from "./User";
import axios from "axios";

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		// Introduced deboucing
		const timeout = setTimeout(() => {
			axios
				.get(`http://localhost:4000/api/v1/user/bulk?filter=${filter}`)
				.then((res) => setUsers(res.data.user));
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [filter]);

	return (
		<>
			<div className="text-xl mt-4">Users</div>
			<input
				placeholder="Search users"
				className="border w-full rounded-md p-2 mt-4"
				onChange={(e) => setFilter(e.target.value)}
			/>

			{users.map((user) => (
				<User user={user} key={user._id} />
			))}
		</>
	);
};
