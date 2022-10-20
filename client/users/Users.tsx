import { useState } from 'react'

import { Comments } from '../comments/Comments'


export const buttonCls = "w-44 border-2 border-black p-1 hover:bg-slate-400"

export function Users() {

	const [userState, setUserState] = useState(false)
	function handleClick() {
		setUserState(!userState)
	}

	const disabledButtonCls = "bg-gray-400 border-2 border-black p-1 w-44"

	return (
		<div className="m-10 flex flex-col">
			{userState ? "Welcome, user! 👋" : "You are not signed in 🙁"}
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
						Sign in
					</button>
				}
				<button
					className={userState ? buttonCls : disabledButtonCls}
					disabled={!userState}
					onClick={() => alert('wow')}>
					Request Comment rights ✍️
				</button>
			</div>
			<Comments signed={userState} />
		</div>
	)
}
