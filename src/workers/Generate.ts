import type { CommentData, PostData, UserData } from "../types";
import { faker } from "@faker-js/faker";


export function fakeSentences(min: number, max: number): string {
	return faker.lorem.sentence({min, max})
}

export function fakeParagraphs(min: number, max: number): string {
	return faker.lorem.paragraphs({min, max})
}

export function fakeDate(): string {
	return faker.date.past().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
}

export function fakeUser(): UserData {
	return {
		name: faker.person.fullName(),
		avatar: faker.string.nanoid(4)
	}
}

export function fakeComment(): CommentData {
	return {
		user: fakeUser(),
		date: fakeDate(),
		content: fakeSentences(1, 10),
	}
}

export function fakeComments(count: number): CommentData[] {
	const comments: CommentData[] = [];
	for (let i = 0; i < count; i++) {
		comments.push(fakeComment());
	}
	return comments;
}

export function fakePost(): PostData {
	const likes = faker.number.int(100000);
	return {
		user: fakeUser(),
		date: fakeDate(),
		content: fakeParagraphs(1, 3),
		likes,
		comments: fakeComments(Math.sqrt(likes))
	}
}

export function fakePosts(count: number): PostData[] {
	const posts: PostData[] = [];
	for (let i = 0; i < count; i++) {
		posts.push(fakePost());
	}
	return posts;
}