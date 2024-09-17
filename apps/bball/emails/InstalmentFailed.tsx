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

interface InstalmentFailedProps {
	userFirstName?: string;
	paymentPrice?: string;
	dueDate?: string;
	paymentNumber?: string;
	paymentLink?: string;
}

const baseUrl = "https://www.riseupleague.com/";

export const InstalmentFailed = ({
	userFirstName,
	paymentPrice,
	dueDate,
	paymentNumber,
	paymentLink,
}: InstalmentFailedProps) => {
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
									Hi {userFirstName},
								</Heading>
								<Text style={{ ...paragraph, marginTop: 5, marginBottom: 10 }}>
									We attempted to automatically charge the following amount of $
									{paymentPrice} from your card but it was unsuccessful.{" "}
									<b>To avoid suspension, you must make a payment today!</b>
								</Text>

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
									<b>Amount: </b>
									<b style={{ color: "red", marginLeft: "5px" }}>
										{" "}
										${paymentPrice} Failed
									</b>
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
								<div style={{ marginTop: "20px", marginBottom: "20px" }}>
									<Link
										href={paymentLink}
										style={{ ...button, marginTop: 20, marginBottom: 20 }}
									>
										Pay Now
									</Link>
								</div>
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
								<b>
									Failure to pay will result in the suspension of your upcoming
									games until the balance is cleared.
								</b>
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

export default InstalmentFailed;

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
