import { defineSyncMapActions } from "@logux/actions";
import { time } from "console";

export const SUBPROTOCOL = '1.0.0'

export type UserType = {
	id: string
	userId: string
	name: string
	commentRights: boolean
}

export const [
	createUser,
	changeUser,
	deleteUser,
	createdUser,
	changedUser,
	deletedUser,
] = defineSyncMapActions<UserType>('users')

export type CreateUser = ReturnType<typeof createUser>
export type CreatedUser = ReturnType<typeof createdUser>
export type DeleteUser = ReturnType<typeof deleteUser>
export type DeletedUser = ReturnType<typeof deletedUser>

export type CommentType = {
	id: string
	userId: string
	creatorId: string
	text: string
}

export const [
	createComment,
	changeComment,
	deleteComment,
	createdComment,
	changedComment,
	deletedComment
] = defineSyncMapActions<CommentType>('comments')

export type CreateComment = ReturnType<typeof createComment>
export type CreatedComment = ReturnType<typeof createdComment>
export type DeleteComment = ReturnType<typeof deleteComment>
export type DeletedComment = ReturnType<typeof deletedComment>

