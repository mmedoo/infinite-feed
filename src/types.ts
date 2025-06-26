export interface UserData {
	name: string;
	avatar: string;
}

export interface CommentData {
	user: UserData;
	date: string;
	content: string;
}

export interface PostData {
	user: UserData;
	date: string;
	content: string;
	comments: CommentData[];
	likes: number;
}