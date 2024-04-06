export const InputBox = ({ label, placeholder, type = "text", onChange }) => {
	return (
		<>
			<div className="text-sm font-medium text-left items-start py-2">
				{label}
			</div>
			<input
				className="w-full px-2 py-1 border rounded"
				placeholder={placeholder}
				type={type}
				onChange={onChange}
			/>
		</>
	);
};
