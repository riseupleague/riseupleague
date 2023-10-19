import { Checkbox } from "@ui/components/checkbox";

export default function FilterCheckbox({ name, id, checked, onChange }) {
	return (
		<div className="flex items-center justify-between space-x-2 space-y-2">
			<label
				htmlFor={id} // Use the 'id' prop as the 'htmlFor' attribute
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{name}
			</label>
			<Checkbox
				id={id}
				checked={checked}
				onCheckedChange={(isChecked) => onChange(isChecked)}
				className="!mr-4 border-white"
			/>
		</div>
	);
}
