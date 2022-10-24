import { useState, useEffect } from "react"
import { useClient, useFilter } from '@logux/client/react'
import { createSyncMap } from '@logux/client'
import { nanoid } from 'nanoid'

import { Comment } from '../stores/comment'
import { User } from '../stores/user'
import { buttonCls } from '../users/Users'

interface props {
	userId: string,
	signed: boolean
}

export function Comments({ userId, signed }: props) {


	let client = useClient()
	
	let users = useFilter(User, { userId })
	
	const handleComment = (cmt: string) => {
		setUserComments([...userComments, cmt])
		createSyncMap(client, Comment, {
			id: nanoid(),
			userId: userId,
			creatorId: users.list[0].id,
			text: cmt
		})
	}

	const detectEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			const input = document.querySelector<HTMLTextAreaElement>('textarea')
			if (input) {
				let cmt = input.value
				input.value = ""
				handleComment(cmt) 
			}
		}
	}

	let serverComments = useFilter(Comment, { userId })

	let serverCommentSection: string[]
	if (serverComments.isLoading) {
		serverCommentSection = ["LOADING SERVER COMMENTS"]
	}
	else if (serverComments.isEmpty) {
		serverCommentSection = ["NO SERVER COMMENTS"]
	}
	else {
		serverCommentSection = serverComments.list.map(srvCmt => srvCmt.text)
	}

	useEffect(() => {
		setUserComments(serverCommentSection)
	}, [serverComments.isLoading, serverComments.list.values])

	const [userComments, setUserComments] = useState([])

	return (

		<div className="mt-6">
			{userComments.map(usrCmt => <p key={nanoid()}>{usrCmt}</p>)} 
			{/*<p>{serverCommentSection}</p> */}
			<form>
				<textarea
					onKeyPress={detectEnter}
					className="mb-5 flex flex-col border-2 border-black p-2 w-[50vw] h-48"
					name="comment"
					placeholder={signed ?
						"Tell me what you think" :
						"Sign in to leave a comment"}
					disabled={!signed}>
				</textarea>
			</form>
		</div>
	)
}
