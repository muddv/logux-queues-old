import { defineSyncMapActions } from "@logux/actions";
export const SUBPROTOCOL = '1.0.0';
export const [createUser, changeUser, deleteUser, createdUser, changedUser, deletedUser,] = defineSyncMapActions('users');
export const [createComment, changeComment, deleteComment, createdComment, changedComment, deletedComment] = defineSyncMapActions('comments');
