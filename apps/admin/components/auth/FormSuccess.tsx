interface FormSuccessProps {
	message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) return null;

	return (
		<div className="flex items-center gap-x-2 rounded-md bg-green-500/15 p-3 text-sm text-green-500">
			<p>{message}</p>
		</div>
	);
};
