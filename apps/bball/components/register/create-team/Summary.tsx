import { convertMilitaryToRegularTime } from "@/utils/convertMilitaryToRegularTime";
import { Checkbox } from "@ui/components/checkbox";
import { Label } from "@ui/components/label";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/components/button";
import getStripe from "@/utils/checkout";
import { Loader2 } from "lucide-react";

const checkboxSchema = z.object({
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms and Conditions",
  }),
  agreeToRefundPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the Refund Policy",
  }),
  receiveNews: z.boolean().optional(),
});

const Summary = ({ registerInfo, setRegisterInfo,user }) => {



	const [isLoader, setIsLoader] = useState(false);
	const [isStripeError,setIsStripeError] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkboxSchema),
    defaultValues: {
      agreeToTerms: false,
      agreeToRefundPolicy: false,
      receiveNews: false,
    },
  });

  const onSubmit = (data: z.infer<typeof checkboxSchema>) => {
    console.log("Form submitted", data);
console.log("user:",user)
	const {players,teamCaptainDetails,teamDetails} = registerInfo
	console.log(registerInfo)

	const formObject = {
		status: "createTeam",
		email:user.email,
		players,
		teamCaptainDetails,
		teamDetails,
		checkboxes:data
		}

		const itemPriceId = registerInfo.division?.earlyBirdOpen ? registerInfo.division?.earlyBirdId : registerInfo.division?.regularPriceId 


	redirectToCheckout([{ price: itemPriceId, quantity: 1 }], formObject);

  };

	// const handleCreateTeamAndPlayer = async (
	// 	itemPriceId: string,
	// 	payment: string
	// ) => {
	// 	setIsLoader(true);

	// 	const {
	// 		teamName,
	// 		teamNameShort,
	// 		instagram,
	// 		phoneNumber,
	// 		teamCode,
	// 		playerName,
	// 	} = formData;

	// 	// Check for required input fields
	// 	if (
	// 		!teamName ||
	// 		teamName.trim() === "" ||
	// 		!teamNameShort ||
	// 		teamNameShort.trim() === ""
	// 	) {
	// 		console.error("Invalid Inputs");
	// 		return; // Exit the function if inputs are invalid
	// 	}

	// 	try {
	// 		let formObject;
	// 		if (payment === "teamPaidFull") {
	// 			formObject = {
	// 				status: "createTeam",
	// 				teamName: teamName,
	// 				teamNameShort: teamNameShort,
	// 				teamCode: teamCode,
	// 				payment: "full",
	// 				paid: true,
	// 				instagram,
	// 				phoneNumber,
	// 				playerName,
	// 				email: session.user.email,
	// 				division: division._id,
	// 				divisionName: division.divisionName,
	// 			};
	// 		} else {
	// 			formObject = {
	// 				status: "createTeam",
	// 				teamName: teamName,
	// 				teamNameShort: teamNameShort,
	// 				teamCode: teamCode,
	// 				payment: payment,
	// 				instagram,
	// 				phoneNumber,
	// 				playerName,
	// 				email: session.user.email,
	// 				division: division._id,
	// 				divisionName: division.divisionName,
	// 			};
	// 		}

	// 		redirectToCheckout([{ price: itemPriceId, quantity: 1 }], formObject);
	// 	} catch (error) {
	// 		console.error("Error creating team:", error);
	// 	}
	// };

	const redirectToCheckout = async (items, formObject) => {
		try {
			setIsLoader(true)
			const response = await fetch("/api/checkout-sessions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ items, formObject: JSON.stringify(formObject) }),
			});

			if (response.ok) {
				const { session } = await response.json();
				const stripe = await getStripe();
				setIsLoader(false)
				await stripe.redirectToCheckout({ sessionId: session.id });
			} else {
				setIsLoader(false)
				setIsStripeError(true)
				console.error("Failed to create Stripe checkout session:", response);
			}
		} catch (error) {
			console.error("Error creating Stripe checkout session:", error);
		}
	};

  

  return (
    <section>
      <h3>Summary</h3>
      <div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
        <h4 className="text-center text-xl uppercase">Team Summary</h4>
        <ul>
          <li className="text-lg">Team Name: {registerInfo.teamDetails?.teamName}</li>
          <li className="text-lg">Team Captain: {registerInfo.teamCaptainDetails?.playerName}</li>
          <li className="text-lg">Division: {registerInfo.division?.divisionName}</li>
          <li className="text-lg">Location: {registerInfo.division?.location}</li>
          <li className="text-lg">
            Game Time:{" "}
            {registerInfo.division?.startTime === "00:00"
              ? "TBD"
              : `${convertMilitaryToRegularTime(registerInfo.division?.startTime)} - ${convertMilitaryToRegularTime(registerInfo.division?.endTime)}`}
            <p className="text-sm text-neutral-200">Game times are subject to change</p>
          </li>
          <li className="text-lg">Game Day: {registerInfo.division?.day}</li>
          {registerInfo?.addFreeAgent === "none" ? (
            ""
          ) : registerInfo?.addFreeAgent === "true" ? (
            <li className="text-lg">Add Free Agents: Yes</li>
          ) : (
            <li className="text-lg">Add Free Agents: No, I will pay the team discount.</li>
          )}
        </ul>
      </div>
      <div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
        <h4 className="text-center text-xl uppercase">Registration Fee Allocation</h4>
        <ul>
          <li className="text-xl">$45 + Tax For Jersey Order</li>
          <li className="text-xl">$45 + Tax For Gym Fees</li>
        </ul>
        <p className="mt-2 flex flex-col text-neutral-200">
          <span>Note: There will be no refunds for this transactions.</span>
          <Link href={"/refund-policy"} target="_blank" className="underline">
            Read Refund Policy
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
          <h4 className="text-center text-xl uppercase">Payment</h4>
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
              <Link className="text-primary transition-all hover:underline" href="/terms-and-conditions" target="_blank">
                Terms and Conditions
              </Link>
              .
            </Label>
          </div>
          {errors.agreeToTerms && <p className="text-red-600">{errors.agreeToTerms.message}</p>}
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
              <Link className="text-primary transition-all hover:underline" href="/refund-policy" target="_blank">
                Refund Policy
              </Link>
              .
            </Label>
          </div>
          {errors.agreeToRefundPolicy && <p className="text-red-600">{errors.agreeToRefundPolicy.message}</p>}
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
		  <p className="text-xl uppercase">Total:</p>

		  {registerInfo.division?.earlyBirdOpen ? 
		  <p className="text-2xl font-semibold">${registerInfo.division?.earlyBirdPrice} + tax</p>	:
		  
		  <p>${registerInfo.division?.regularPrice} + tax</p>

		 
		  }
		 
		  </div>





          <Button type="submit" className="w-full mt-4">
		  {isLoader ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										"Proceed to checkout"
									)}

            
          </Button>

		  {registerInfo.addFreeAgent === "true" &&
		  		  <p className="my-2 text-lg text-center">Reminder: Since you only have {registerInfo.players.length} players in your roster, We will add free agents to your team.</p>

		  }

		{registerInfo.addFreeAgent === "false" &&
		  		  <p className="my-2 text-lg text-center">Reminder: Since you only have {registerInfo.players.length} players in your roster, You need to pay full team fee to avoid free agents.</p>

		  }


        </div>
      </form>
	  {isStripeError && <p className="text-red-500 text-2xl">Something went wrong. Please let us know and we will fix it right away.</p>}
    </section>
  );
};

export default Summary;
