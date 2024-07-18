import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@ui/components/checkbox";
import { Label } from "@ui/components/label";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { Loader2 } from "lucide-react";

const AddFreeAgentTrue = ({
	handleSubmit,
	onSubmit,
	control,
	errors,
	registerInfo,
	isLoader,
	setSubmitType,
	onSubmitInstallments,
}) => {
	return (
		<Tabs defaultValue="regular">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="regular">One Time Payment</TabsTrigger>
				<TabsTrigger value="installment">Four Installments</TabsTrigger>
			</TabsList>
			<TabsContent value="regular">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h4 className="mt-10 text-center text-xl uppercase">
						One Time Payment
					</h4>
					<p className="text-lg"> Please Check All Boxes Before Proceeding</p>
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToTerms"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxTerms"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxTerms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I have read and agree to the{" "}
							<Link
								className="text-primary transition-all hover:underline"
								href="/terms-and-conditions"
								target="_blank"
							>
								Terms and Conditions
							</Link>
							.
						</Label>
					</div>
					{errors.agreeToTerms && (
						<p className="text-red-600">{errors.agreeToTerms.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToRefundPolicy"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxRefund"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxRefund"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I have read and agree to the{" "}
							<Link
								className="text-primary transition-all hover:underline"
								href="/refund-policy"
								target="_blank"
							>
								Refund Policy
							</Link>
							.
						</Label>
					</div>
					{errors.agreeToRefundPolicy && (
						<p className="text-red-600">{errors.agreeToRefundPolicy.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="receiveNews"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxNews"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxNews"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I want to receive emails for the latest news about Rise Up.
						</Label>
					</div>
					<div className="mt-5">
						<p className="text-xl uppercase">Price Breakdown Per Player:</p>
						<p className="my-2">Gyms Fee: $80</p>
						<p className="my-2">Uniforms: $50</p>
						<p className="my-2">Media: $50</p>
						<p className="my-2">Referees: $40</p>
						<p className="my-2">Stats/Game Videos/Graphics: $50</p>
						<p className="my-2">
							Regular Price Total: ${80 + 50 + 50 + 40 + 50}
						</p>
					</div>

					<div className="mt-5">
						{registerInfo.division?.earlyBirdOpen ? (
							<>
								<p className="text-xl uppercase">
									Early Bird Player Discount Price:
								</p>

								<p className="text-2xl font-semibold">
									${registerInfo.division?.earlyBirdPrice} + tax
								</p>
								<ul>
									<li className="my-2">
										Regular price is ${registerInfo.division?.regularPrice} +
										tax
									</li>

									<li className="my-2">
										Get a $
										{80 +
											50 +
											55 +
											40 +
											55 -
											registerInfo.division?.earlyBirdPrice}{" "}
										discount
									</li>
									<li className="my-2">Add unlimited players</li>

									<li className="my-2">Limited Time Only</li>
								</ul>
							</>
						) : (
							<>
								<p className="text-xl uppercase">Total:</p>

								<p className="text-2xl font-semibold">
									${registerInfo.division?.regularPrice} + tax
								</p>
							</>
						)}
					</div>

					<Button type="submit" className="mt-4 w-full">
						{isLoader ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							"Proceed to checkout"
						)}
					</Button>

					{registerInfo.addFreeAgent === "true" && (
						<p className="my-2 text-center text-lg">
							Reminder: Since you only have {registerInfo.players.length}{" "}
							players in your roster, We will add free agents to your team.
						</p>
					)}

					{registerInfo.addFreeAgent === "false" && (
						<p className="my-2 text-center text-lg">
							Reminder: Since you only have {registerInfo.players.length}{" "}
							players in your roster, You need to pay full team fee to avoid
							free agents.
						</p>
					)}
				</form>
			</TabsContent>
			<TabsContent value="installment">
				<form onSubmit={handleSubmit(onSubmitInstallments)}>
					<h4 className="mt-10 text-center text-xl uppercase">
						Four Installments
					</h4>
					<p className="text-lg"> Please Check All Boxes Before Proceeding</p>
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToTerms"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxTerms"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxTerms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I have read and agree to the{" "}
							<Link
								className="text-primary transition-all hover:underline"
								href="/terms-and-conditions"
								target="_blank"
							>
								Terms and Conditions
							</Link>
							.
						</Label>
					</div>
					{errors.agreeToTerms && (
						<p className="text-red-600">{errors.agreeToTerms.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToRefundPolicy"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxRefund"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxRefund"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I have read and agree to the{" "}
							<Link
								className="text-primary transition-all hover:underline"
								href="/refund-policy"
								target="_blank"
							>
								Refund Policy
							</Link>
							.
						</Label>
					</div>
					{errors.agreeToRefundPolicy && (
						<p className="text-red-600">{errors.agreeToRefundPolicy.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="receiveNews"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxNews"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxNews"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I want to receive emails for the latest news about Rise Up.
						</Label>
					</div>

					<div className="mt-5">
						<p className="text-xl uppercase">Price Breakdown Per Player:</p>
						<p className="my-2">Gyms Fee: $80</p>
						<p className="my-2">Uniforms: $50</p>
						<p className="my-2">Media: $50</p>
						<p className="my-2">Referees: $40</p>
						<p className="my-2">Stats/Game Videos/Graphics: $50</p>
						<p className="my-2">
							Regular Price Total: ${80 + 50 + 50 + 40 + 50}
						</p>
					</div>

					<div className="mt-5">
						<p className="text-xl uppercase">Installment Price:</p>
						<p className="text-2xl font-semibold">
							${registerInfo.division?.firstInstalmentPrice} + tax and $
							{registerInfo.division?.instalmentPrice} + tax three times
							biweekly
						</p>
						<ul>
							<li className="my-2">
								First Payment: ${registerInfo.division?.firstInstalmentPrice}
							</li>

							<li className="my-2">
								Second Payment: ${registerInfo.division?.instalmentPrice}
							</li>
							<li className="my-2">
								Third Payment: ${registerInfo.division?.instalmentPrice}
							</li>

							<li className="my-2">
								Fourth Payment: ${registerInfo.division?.instalmentPrice}
							</li>
							<li className="my-2">Instalment Processing fee: $10</li>
							<li className="my-2">
								Total: ${registerInfo.division?.regularPrice}
							</li>
						</ul>
					</div>

					<Button type="submit" className="mt-4 w-full">
						{isLoader ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							"Proceed to checkout"
						)}
					</Button>

					<p className="my-2 text-center text-lg">
						Reminder: Since you only have {registerInfo.players.length} players
						in your roster, We will add free agents to your team.
					</p>
				</form>
			</TabsContent>
		</Tabs>
	);
};

export default AddFreeAgentTrue;
