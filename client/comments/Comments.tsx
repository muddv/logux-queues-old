import { useState, FormEvent } from "react"

import { buttonCls } from '../users/Users'

interface props {
	signed: boolean
}
let i = 0
export function Comments({ signed }: props) {

	const [userComments, setUserComments] = useState([])

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		i++
		event.preventDefault()
		const input = event.currentTarget.querySelector<HTMLTextAreaElement>('textarea')
		if (input) {
			const cmt = input.value
			input.value = ""
			setUserComments(userComments =>
				[...userComments, cmt])
		}
	}

	let commentSection = userComments.map(userComment => <p key={i}>{userComment}</p>)

	return (
		<div className="mt-6">
			{commentSection}
			<form onSubmit={handleSubmit}>
				<textarea
					className="mb-5 flex flex-col border-2 border-black p-2 w-[50vw] h-48"
					name="comment"
					placeholder={signed ?
						"Tell me what you think" :
						"Sign in and request comment rights to leave a comment"}
					disabled={!signed}>
				</textarea>
				<button formAction="submit"
					className={buttonCls}>
					submit
				</button>
			</form>
		</div>
	)
}


