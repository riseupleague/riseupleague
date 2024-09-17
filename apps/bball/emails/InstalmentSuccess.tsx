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

interface InstalmentSuccessProps {
	userFirstName?: string;
	paymentPrice?: string;
	paymentDate?: string;
	paymentNumber?: string;
	paymentLink?: string;
}

const baseUrl = "https://www.riseupleague.com/";

export const InstalmentSuccess = ({
	userFirstName,
	paymentPrice,
	paymentDate,
	paymentNumber,
}: InstalmentSuccessProps) => {
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
									Hi {userFirstName}, this email confirms the success of your
									installment payment from Rise Up League.
								</Heading>

								<Text style={{ ...paragraph, textAlign: "center" }}>
									<b>Below are the details:</b>
								</Text>
								<Text
									style={{
										...paragraph,
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<b>Payment Date: </b>
									<b style={{ marginLeft: "5px" }}> {paymentDate}</b>
								</Text>
								<Text
									style={{
										...paragraph,
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<b>Amount Paid: </b>
									<b style={{ marginLeft: "5px" }}> ${paymentPrice}</b>
								</Text>
								<Text
									style={{
										...paragraph,
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<b>Payment Number: </b>
									<b style={{ marginLeft: "5px" }}>{paymentNumber} of 4</b>
								</Text>
							</Column>
						</Row>

						<Row>
							<Text
								style={{
									...paragraph,
									textAlign: "center",
									marginTop: 10,
									marginBottom: 10,
								}}
							>
								<b>Thank you for playing at Rise Up League!</b>
							</Text>

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

export default InstalmentSuccess;

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
