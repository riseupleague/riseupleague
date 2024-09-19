import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				playerCard:
					"border-none bg-neutral-600 text-neutral-100 uppercase rounded-sm text-center font-normal",
				division:
					"font-barlow mx-auto rounded border border-neutral-500 bg-neutral-500 px-5 py-1 text-center text-sm font-semibold uppercase text-white hover:bg-neutral-500 md:px-10 md:py-3 md:text-4xl",
				schedule:
					"font-inter w-fit text-center rounded-sm border-none bg-[#18181b] px-[15px] py-1 text-[10px] md:text-xs font-normal capitalize text-neutral-100 rounded-[17px]",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
