import { useState } from 'react'
import { useClient, useFilter } from '@logux/client/react'
import { changeSyncMapById, createSyncMap } from '@logux/client'
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
	let wow
	const [userState, setUserState] = useState(false)
	function handleClick() {
		console.log("HANDLE CLICK")
		setUserState(!userState)
		let newUsr = {
			id: nanoid(),
			userId,
			name: "user",
			commentRights: false
		}
		wow = newUsr.id
		createSyncMap(client, User, newUsr)
		changeSyncMapById(client, User, wow, { name: nanoid() })
	}

	function handleClick2() {
		console.log("handleClick2")
		changeSyncMapById(client, User, wow, { name: nanoid() })
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
				{!users.isEmpty && !users.isLoading ? users.list[0].name : "WOW"}
				{userState ?
					<button
						onClick={handleClick && handleClick2}
						className={buttonCls}>
						Sign out
					</button>
					:
					<button
						onClick={handleClick && handleClick2}
						className={buttonCls}>
						Sign up
					</button>
				}
			</div>
			<Comments userId={userId} signed={userState} />
		</div>
	)
}
