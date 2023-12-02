"use client"

import { Button } from "@ui/components/button"
import { Input } from "@ui/components/input"
import { Textarea } from "@ui/components/textarea"

export default function ContactForm(): JSX.Element {
	const handleSubmit = async () => {
		const res = await fetch("/api/email/contact")
		console.log(res)
	}

  return (
			<form className="mx-auto flex h-fit max-w-3xl flex-col gap-4 rounded border border-neutral-400 px-4 py-8 sm:mt-32">
				{/* name */}
				<div className="flex flex-col gap-2">
					<label htmlFor="name">Name:</label>
					<Input id="name" type="name" placeholder="Name" className="text-neutral-900 text-lg" />
				</div>

				{/* email */}
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Email:</label>
					<Input id="email" type="email" placeholder="Email" className="text-neutral-900 text-lg" />
				</div>

				{/* message */}
				<div className="flex flex-col gap-2">
					<label htmlFor="message">Message:</label>
          <Textarea id="message" placeholder="Message" className="text-neutral-900 text-lg" />
				</div>
				<Button onClick={handleSubmit} type="submit" variant="register">
					submit
				</Button>
			</form>
  )
}