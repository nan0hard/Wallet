import AppBar from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

const Dashboard = () => {
	return (
		<>
			<AppBar />
			<div className="m-8">
				<Balance value={"10,000"} />
				<Users />
			</div>
		</>
	);
};

export default Dashboard;
