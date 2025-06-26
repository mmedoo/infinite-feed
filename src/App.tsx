import { useEffect, useMemo, useState } from "react";
import Comments from "./components/Comments"
import Post from "./components/Post"
import type { PostData } from "./types"

function App() {

	const [{ show, post }, setComments] = useState<{ show: boolean, post?: PostData }>({
		show: false
	});

	const [posts, setPosts] = useState<PostData[]>([]);

	useEffect(() => {
		const worker = new Worker(new URL('./workers/fakerWorker.js', import.meta.url), {
			type: 'module',
		});

		worker.onmessage = (e) => {
			setPosts(prev => [...prev, ...e.data]);
		};
		
		worker.postMessage({ count: 5 });

		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
			const scrolled = (scrollTop + clientHeight) / scrollHeight;
			if (scrolled >= 0.9) {
				clearTimeout((handleScroll as any)._debounce);
				(handleScroll as any)._debounce = setTimeout(() => {
					worker.postMessage({ count: 5 });
				}, 100);
			}
		};

		document.body.onscroll = handleScroll;

		return () => {
			worker.terminate();
			document.body.onscroll = null;
		};

	}, []);

	useEffect(() => {
		document.body.style.overflow = show ? "hidden" : "auto";
	}, [show])

	return (
		<>
			<div id="posts">
				{
					useMemo(() => posts.map((post: PostData) =>
						<Post setComments={setComments} post={post} key={post.user.name} />
					), [posts])
				}
			</div>

			<br />
			<br />

			<img width={50} src="/spinner-2.svg" alt="spinner" />
			
			<br />
			<br />
			<br />

			<div id="layer" style={show ? {} : { display: "none" }}>
				<div id="layer-inner">
					<div className="hoverable" id="close" onClick={() => setComments({ show: false })}>
						X
					</div>
					{
						post && <Comments post={post} />
					}
				</div>
			</div>
		</>
	)
}

export default App
