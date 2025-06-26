import { memo, useCallback, useState, type Dispatch, type MouseEvent, type SetStateAction } from "react";
import type { PostData } from "../../types";
import Multiavatar from "@multiavatar/multiavatar";
import "./post.css"

export const PostHeader = memo(({ post }: { post: PostData }) => {
	return (
		<div className="post-header">
			<div className="user-avatar" dangerouslySetInnerHTML={{ __html: Multiavatar(post.user.avatar) }}></div>
			<div className="post-user-info">
				<span className="user-name">{post.user.name}</span>
				<span className="content-date">{post.date}</span>
			</div>
		</div>
	);
})

export const PostBody = memo(({ post }: { post: PostData }) => {
	return (
		<div className="post-body">
			<span>{post.content}</span>
		</div>
	)
})

export const PostControls = memo((
	{ post, setComments }: {
		post: PostData,
		setComments?: Dispatch<SetStateAction<{ show: boolean, post?: PostData }>>
	}) => {
		
		const [likes, setlikes] = useState(post.likes);

		const updateLikes = useCallback((e: MouseEvent) => {
			const isLiked = e.currentTarget.classList.toggle('liked');
			setlikes(prev => isLiked ? ++prev : --prev);
		}, []);
		
	return (
		<div className="post-controls">
			<div onClick={updateLikes} className="post-control post-control-like hoverable">
				<svg fill="none" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="like" role="img"> <path d="M12 21s-6.5-5.2-8.5-8.1C1.3 10.1 2.1 7.1 4.7 5.7c2.1-1.1 4.5-0.3 5.8 1.3C11.5 7.3 12.5 7.3 13.5 7c1.3-1.6 3.7-2.4 5.8-1.3 2.6 1.4 3.4 4.4 1.2 7.2C18.5 15.8 12 21 12 21z" stroke="#000" strokeWidth="0.5" /></svg>
				<div>{likes.toLocaleString('en-US')}</div>
			</div>
			<div onClick={() => setComments?.call({}, { show: true, post })} className="post-control hoverable post-control-comments">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999"><path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" /></svg>					<div>{post.comments.length.toLocaleString('en-US')}</div>
			</div>
		</div>
	)
})

const Post = memo((
	{ post, setComments }: {
		post: PostData,
		setComments?: Dispatch<SetStateAction<{ show: boolean, post?: PostData }>>
	}) => {
	return (
		<div className="post">
			<PostHeader post={post} />
			<PostBody post={post} />
			<PostControls setComments={setComments} post={post} />
		</div>
	)
})

export default Post;