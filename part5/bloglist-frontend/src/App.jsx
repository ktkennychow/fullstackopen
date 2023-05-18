import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [notification, setNotification] = useState('');
	const [status, setStatus] = useState({});
	const good = {
		color: 'green',
		border: 'green 3px solid',
		backgroundColor: '#ccc',
		padding: '10px',
		borderRadius: '5px',
	};
	const bad = {
		color: 'red',
		border: 'red 3px solid',
		backgroundColor: '#ccc',
		padding: '10px',
		borderRadius: '5px',
	};

	useEffect(() => {
		user &&
			blogService
				.getAll()
				.then((blogs) => setBlogs(blogs))
				.then(() => {});
	}, [user]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setNotification(`login successfully! welcome ${user.name}.`);
			setStatus(good);
			setTimeout(() => {
				setNotification('');
				setStatus({});
			}, 5000);
			setUsername('');
			setPassword('');
		} catch (err) {
			setNotification(err.response.data.error);
			setStatus(bad);
			setTimeout(() => {
				setNotification('');
				setStatus({});
			}, 5000);
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		try {
			window.localStorage.removeItem('loggedUser');
			blogService.setToken(null);
			setUser(null);
			setNotification(`logout successfully! see you next time.`);
			setStatus(good);
			console.log(notification);
			setTimeout(() => {
				setNotification('');
				setStatus({});
			}, 5000);
		} catch (err) {
			setNotification(err.response.data.error);
			setStatus(bad);
			console.log(notification, status);
			setTimeout(() => {
				setNotification('');
				setStatus({});
			}, 5000);
		}
	};

	const handleNewBlog = async (event) => {
    event.preventDefault();
		const blog = {
			title: title,
			author: author,
			url: url,
		};
		try {
			const newBlog = await blogService.create(blog);
			setNotification(`a new blog ${title} by ${author} added.`);
			setStatus(good);
			setBlogs(blogs.concat(newBlog));
			console.log(notification);
			setTimeout(() => {
				setNotification('');
				setStatus({});
			}, 5000);
			setTitle('');
			setAuthor('');
			setUrl('');
		} catch (err) {
			setNotification(err.response.data.error);
			setStatus(bad);
			console.log(notification, status);
			setTimeout(() => {
				setNotification('');
				setStatus({});
			}, 5000);
		}
	};

	const blogsDisplay = () => (
		<div>
			<h2>blogs</h2>
			<h3 style={status}>{notification}</h3>
			<p>
				{user.name} logged in<button onClick={handleLogout}>logout</button>
			</p>
			<h2>create new</h2>
			<form onSubmit={handleNewBlog}>
				<div>
					title:
					<input
						type='text'
						value={title}
						name='title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						type='text'
						value={author}
						name='author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						type='text'
						value={url}
						name='url'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type='submit'>create</button>
			</form>
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
				/>
			))}
		</div>
	);
	const loginForm = () => (
		<div>
			<h2>log in to application</h2>
			<h3 style={status}>{notification}</h3>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='username'
						onChange={({ target }) => {
							setUsername(target.value);
						}}
					/>
				</div>
				<div>
					password
					<input
						type='text'
						value={password}
						name='password'
						onChange={({ target }) => {
							setPassword(target.value);
						}}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	);
	return <div>{!user ? loginForm() : blogsDisplay()}</div>;
};

export default App;
