import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-neutral-100 text-neutral-900 transition font-barlow rounded font-semibold hover:bg-neutral-200",
				secondary:
					"bg-neutral-500 font-barlow font-medium text-neutral-100 border border-neutral-500 rounded-md transition hover:bg-neutral-800",
				signIn:
					"flex items-center gap-2 bg-neutral-500 text-neutral-50 uppercase font-barlow transition-all hover:opacity-80",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-neutral-700 hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				register:
					"text-white bg-primary uppercase font-bold font-barlow transition hover:bg-primaryDark",
				navlink:
					"bg-transparent text-white border-none px-0 flex items-center gap-3 w-full justify-start",
			},
			size: {
				default: "px-12 py-2",
				sm: "h-9 rounded-md px-5",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
				navlink: "px-6 py-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
