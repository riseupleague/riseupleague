import { Checkbox } from "@ui/components/checkbox";

export default function FilterCheckbox({ name, id, checked, onChange }) {
	return (
		<div className="my-1 flex items-center justify-between space-x-2 space-y-2">
			<label
				htmlFor={id} // Use the 'id' prop as the 'htmlFor' attribute
				className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{name}
			</label>
			<Checkbox
				id={id}
				checked={checked}
				onCheckedChange={(isChecked) => onChange(isChecked)}
				className="font-barlow !mr-4 border-neutral-50"
			/>
		</div>
	);
}
