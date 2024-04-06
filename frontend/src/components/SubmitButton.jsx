export const SubmitButton = ({ label, onClick }) => {
	return (
		<>
			<button
				className="border w-full py-2 mt-4 bg-black text-white rounded-lg"
				onClick={onClick}
			>
				{label}
			</button>
		</>
	);
};
