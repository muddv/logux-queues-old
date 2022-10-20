import { Server } from "@logux/server";
import { 
	UserType,
	createUser,
	changeUser,
	deleteUser,
	createdUser,
	changedUser,
	deletedUser
} from '../../protocol/protocol.js'

export const USERS: Map<string, UserType> = new Map()

export default (server: Server) => {
	server.channel('users', {
		access(ctx, action) {
			return ctx.userId === action.filter?.userId
		},
		filter(ctx, action) {
			return (otherCtx, otherAction) => {
				if (createdUser.match(otherAction)) {
					return otherAction.fields?.userId === ctx.userId
				} else if (
					deletedUser.match(otherAction) ||
					changedUser.match(otherAction)
				) {
					return USERS.get(otherAction.id)?.userId === ctx.userId
				} else {
					return otherCtx.userId === ctx.userId
				}
			}
		},
		load(ctx, action) {
			return Array.from(USERS.values())
				.filter(user => action.filter?.userId)
				.map(user => {
					let { id, ...fields } = user
					return createdUser({ id, fields })
				})
		}
	})

	server.channel<{ id: string }>('users/:id', {
		access(ctx) {
			return true
		}
	})
	server.type(createUser, {
		access(ctx, action) {
			return ctx.userId === action.fields.userId
		},
		async process(ctx, action) {
			USERS.set(action.id, { id: action.id, ...action.fields })
			await server.process(
				createdUser({ id: action.id, fields: action.fields })
			)
		}
	})

	server.type(createdUser, {
		access() {
			return false
		},
		resend(ctx, action) {
			return ['users', `users/${action.id}`]
		}
	})

	server.type(changeUser, {
		access(ctx, action) {
			return ctx.userId === USERS.get(action.id)?.userId
		},
		async process(ctx, action) {
			USERS.set(action.id, { ...USERS.get(action.id)!, ...action.fields })
			await server.process(
				changedUser({ id: action.id, fields: action.fields })
			)
		}
	})

	server.type(changedUser, {
		access() {
			return false
		},
		resend(ctx, action) {
			return ['users', `users/${action.id}`]
		}
	})

	server.type(deleteUser, {
		access(ctx, action) {
			return ctx.userId === USERS.get(action.id)?.userId
		},
		async process(ctx, action) {
			USERS.delete(action.id)
			await server.process(deletedUser({ id: action.id }))
		}
	})

	server.type(deletedUser, {
		access() {
			return false
		},
		resend(ctx, action) {
			return ['users', `users/${action.id}`]
		}
	})
}
