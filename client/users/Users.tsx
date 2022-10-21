import { useState } from 'react'
import { useClient, useFilter } from '@logux/client/react'
import { createSyncMap } from '@logux/client'
import { nanoid } from 'nanoid'

import { User } from '../stores/user'
import { Comments } from '../comments/Comments'

export const buttonCls = "w-44 border-2 border-black p-1 hover:bg-slate-400"


interface props {
	userId: string
}

export function Users({ userId }: props) {

	// load users from server
	let users = useFilter(User, { userId })
	let client = useClient()
	const [userState, setUserState] = useState(false)
	function handleClick() {
		setUserState(!userState)
		setTimeout(() => {
			createSyncMap(client, User, {
				id: nanoid(),
				userId,
				name: "user",
				commentRights: false
			})
		}, 5000)
	}

	let userBlock: string
	if (users.isLoading) {
		userBlock = "Loading..."
	}
	else if (users.isEmpty) {
		userBlock = "No users"
	}
	else {
		userBlock = "There are users"
	}

	return (
		<div className="m-10 flex flex-col items-center">
			<p>{userBlock}</p>
			{userState ? "Welcome, user! 👩‍💻" : "Welcome, guest! 😺"}
			<div className="flex flex-row gap-5">
				{userState ?
					<button
						onClick={handleClick}
						className={buttonCls}>
						Sign out
					</button>
					:
					<button
						onClick={handleClick}
						className={buttonCls}>
						Sign up
					</button>
				}
			</div>
			<Comments userId={userId} signed={userState} />
		</div>
	)
}
