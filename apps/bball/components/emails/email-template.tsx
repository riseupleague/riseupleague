interface EmailTemplateProps {
	firstName: string;
	status: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	status,
}) => (
	<div>
		<h1>
			{firstName}, {status}!
		</h1>
	</div>
);
