import * as React from "react";

import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				form: "border-neutral-300 rounded-md bg-[#111827] text-lg font-normal ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full border file:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 p-4",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputVariants({ variant }), className)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
