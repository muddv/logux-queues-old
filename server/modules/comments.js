import { delay } from 'nanodelay';
import { createComment, changeComment, deleteComment, createdComment, changedComment, deletedComment } from '../../protocol/protocol.js';
export const COMMENTS = new Map();
export default (server) => {
    server.channel('comments', {
        access(ctx, action) {
            return ctx.userId === action.filter?.userId;
        },
        filter(ctx, action) {
            return (otherCtx, otherAction) => {
                if (createdComment.match(otherAction)) {
                    return otherAction.fields?.userId === ctx.userId;
                }
                else if (deletedComment.match(otherAction) ||
                    changedComment.match(otherAction)) {
                    return COMMENTS.get(otherAction.id)?.userId === ctx.userId;
                }
                else {
                    return otherCtx.userId === ctx.userId;
                }
            };
        },
        load(ctx, action) {
            return Array.from(COMMENTS.values())
                .filter(comment => action.filter?.userId)
                .map(comment => {
                let { id, ...fields } = comment;
                return createdComment({ id, fields });
            });
        }
    });
    server.channel('comments/:id', {
        access(ctx) {
            return true;
        }
    });
    server.type(createComment, {
        access(ctx, action) {
            return ctx.userId === action.fields.userId;
        },
        async process(ctx, action) {
            COMMENTS.set(action.id, { id: action.id, ...action.fields });
            await server.process(createdComment({ id: action.id, fields: action.fields }));
        }
    });
    server.type(createdComment, {
        access() {
            return false;
        },
        resend(ctx, action) {
            return ['comments', `comments${action.id}`];
        }
    });
    server.type(changeComment, {
        async access(ctx, action) {
            await delay(1);
            return ctx.userId === COMMENTS.get(action.id)?.userId;
        },
        async process(ctx, action) {
            COMMENTS.set(action.id, { ...COMMENTS.get(action.id), ...action.fields });
            await server.process(changedComment({ id: action.id, fields: action.fields }));
        }
    });
    server.type(changedComment, {
        access() {
            return false;
        },
        resend(ctx, action) {
            return ['comments', `comments${action.id}`];
        }
    });
    server.type(deleteComment, {
        access(ctx, action) {
            return ctx.userId === COMMENTS.get(action.id)?.userId;
        },
        async process(ctx, action) {
            COMMENTS.delete(action.id);
            await server.process(deletedComment({ id: action.id }));
        }
    });
    server.type(deletedComment, {
        access() {
            return false;
        },
        resend(ctx, action) {
            return ['comments', `comments${action.id}`];
        }
    });
};
