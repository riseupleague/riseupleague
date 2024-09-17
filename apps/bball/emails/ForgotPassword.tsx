import {
	Body,
	Button,
	Container,
	Column,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text,
	Link,
} from "@react-email/components";
import * as React from "react";

interface ForgotPasswordEmailTemplateProps {
	name: string;
	link: string;
}

const baseUrl = "https://www.riseupleague.com/";

export const ForgotPasswordEmail = ({
	name,
	link,
}: ForgotPasswordEmailTemplateProps) => {
	return (
		<Html>
			<Head />
			<Body style={main}>
				<Container>
					<Section style={{ paddingTop: "20px" }}>
						<Row style={{ paddingBottom: "20px" }}>
							<Img
								style={{ margin: "0 auto", width: "200px" }}
								src={`${baseUrl}/images/riseup-logo.png`}
							/>
						</Row>

						<Row>
							<Column>
								<Heading
									style={{
										fontSize: 24,
										fontWeight: "bold",
										textAlign: "center",
									}}
								>
									Hi {name},
								</Heading>
								<Text style={{ ...paragraph, marginTop: 5, marginBottom: 10 }}>
									You recently requested a password reset for your account. To
									complete the process, click the link below. Please note this
									link will expire in 1 hours.
								</Text>

								<Link className="underline" href={link}>
									Reset Now
								</Link>

								<Text style={{ ...paragraph, marginTop: 5, marginBottom: 10 }}>
									If you did not make this change or if you believe an
									unauthorized person has accessed your account, reset your
									password immediately.
								</Text>
							</Column>
						</Row>

						<Row>
							<Text style={{ ...paragraph, textAlign: "center" }}>
								<b>Need Help?</b>
							</Text>
							<Text
								style={{ ...paragraph, textAlign: "center", marginTop: -10 }}
							>
								Send us an email at support@riseupleague.com
							</Text>
						</Row>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default ForgotPasswordEmail;

const main = {
	backgroundColor: "#fff",
	fontFamily: '"Oswald",sans-serif',
};

const paragraph = {
	fontSize: 16,
};

const logo = {
	padding: "30px 20px",
};

const containerButton = {
	display: "flex",
	justifyContent: "center",
	width: "100%",
};

const button = {
	backgroundColor: "#fe432e",
	borderRadius: 3,
	color: "#FFF",
	fontWeight: "bold",
	border: "1px solid rgb(0,0,0, 0.1)",
	cursor: "pointer",
	padding: "12px 30px",
};

const content = {
	border: "1px solid rgb(0,0,0, 0.1)",
	borderRadius: "3px",
	overflow: "hidden",
};

const image = {
	maxWidth: "100%",
};

const boxInfos = {
	padding: "20px",
};

const containerImageFooter = {
	padding: "45px 0 0 0",
};
