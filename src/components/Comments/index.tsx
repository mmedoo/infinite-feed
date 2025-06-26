import { memo, useCallback, useState, type UIEvent } from "react";
import { PostBody, PostHeader } from "../Post";
import type { CommentData, PostData } from "../../types";
import multiavatar from "@multiavatar/multiavatar";
import "./comments.css"

export const Comment = memo(({ comment }: { comment: CommentData }) => {
	return (
		<div className="comment" key={comment.user.name}>
			<div className="user-avatar" dangerouslySetInnerHTML={{ __html: multiavatar(comment.user.avatar) }}></div>
			<div className="comment-content">
				<div className="comment-header">
					<span className="comment-user-name">{comment.user.name}</span>
					<span className="content-date">{comment.date}</span>
				</div>
				<span>{comment.content}</span>
			</div>
		</div>
	);
})

const Comments = memo(({ post }: { post: PostData }) => {
	const [offset, setOffset] = useState(10);

	const handleScroll = useCallback((e: UIEvent) => {
		const { scrollTop, clientHeight, scrollHeight } = e.target as HTMLDivElement;
		const scrolled = (scrollTop + clientHeight) / scrollHeight;
		if (scrolled >= 0.98) {
			setOffset((prevOffset) => prevOffset + 10);
		}
	}, []);

	return (
		<div onScroll={handleScroll} id="comments">
			<div>
				<PostHeader post={post} />
				<PostBody post={post} />
			</div>
			<div onScroll={handleScroll}>
				{
					post.comments.slice(0, offset).map((comment: CommentData) => (
						<Comment key={comment.user.name} comment={comment} />
					))
				}
				{
					offset < post.comments.length
					&&
					<>
						<br />
						<br />
						
						<img src="spinner-2.svg" alt="spinner" />

						<br />
						<br />
						<br />
					</>
				}
			</div>
		</div>
	)
})

export default Comments;
