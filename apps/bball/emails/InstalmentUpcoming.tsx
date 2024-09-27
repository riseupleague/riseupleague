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

interface InstalmentUpcomingProps {
	userFirstName?: string;
	paymentPrice?: string;
	dueDate?: string;
	paymentNumber?: string;
}

const baseUrl = "https://www.riseupleague.com/";

export const InstalmentUpcoming = ({
	userFirstName,
	paymentPrice,
	dueDate,
	paymentNumber,
}: InstalmentUpcomingProps) => {
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
									Just a friendly reminder that your next installment payment of
									<b> {paymentPrice}</b> is due on <b> {dueDate}</b>. We’ll
									automatically process the payment on <b> {dueDate}</b>.
								</Text>

								<Text style={{ ...paragraph, textAlign: "center" }}>
									<b>Payment Reminder:</b>
								</Text>
								<Text
									style={{
										...paragraph,
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<b>Due Date: </b>
									<b> {dueDate}</b>
								</Text>
								<Text
									style={{
										...paragraph,
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<b>Total Amount Due: </b>
									<b> ${paymentPrice}</b>
								</Text>
								<Text
									style={{
										...paragraph,
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<b>Payment Number: </b>
									<b> {paymentNumber} of 4</b>
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
								You are required to make all installment payments by the
								scheduled due date.{" "}
								<b>
									Please note that late payments will result in the suspension
									of your upcoming games until the balance is cleared.
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

export default InstalmentUpcoming;

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
	backgroundColor: "#e00707",
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
