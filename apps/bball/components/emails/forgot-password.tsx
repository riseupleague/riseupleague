interface ForgotPasswordEmailTemplateProps {
	name: string;
	link: string;
}

export const ForgotPasswordEmailTemplate: React.FC<
	Readonly<ForgotPasswordEmailTemplateProps>
> = ({ name, link }) => (
	<div>
		<p>Dear {name}:</p>
		<p>
			You recently requested a password reset for your account. To complete the
			process, click the link below. Please note this link will expire in 1
			hours.
		</p>

		<a href={link}>Reset Now</a>

		<p>
			If you did not make this change or if you believe an unauthorized person
			has accessed your account, reset your password immediately.
		</p>
	</div>
);
