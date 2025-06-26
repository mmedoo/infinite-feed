/* eslint-disable no-restricted-globals */
import { fakePosts } from './Generate';

self.onmessage = (e) => {
	const { count } = e.data;

	self.postMessage(fakePosts(count));
};
