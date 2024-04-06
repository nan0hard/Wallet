const AppBar = () => {
	return (
		<div className="shadow h-14 flex justify-between">
			<div className="flex flex-col justify-center h-full ml-4">Wallet App</div>
			<div className="flex">
				<div className="flex flex-col justify-center h-full mr-4">Hello,</div>
				<div className="rounded-full bg-gray-300 h-12 w-12 flex justify-center items-center m-auto mr-4 text-center">
					<div className="flex flex-col justify-center h-full text-2xl">N</div>
				</div>
			</div>
		</div>
	);
};

export default AppBar;
