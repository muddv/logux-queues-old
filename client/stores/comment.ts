import { syncMapTemplate } from "@logux/client";
import { CommentType } from "../../protocol/protocol"

export const Comment = syncMapTemplate<CommentType>('comments')

