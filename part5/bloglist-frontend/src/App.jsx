import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import ToggleVisibility from './components/ToggleVisibility';

const App = () => {
	const blogFormRef = useRef();
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState('');
	const [status, setStatus] = useState({});
	const good = {
		color: 'green',
		border: 'green 3px solid',
		padding: '10px',
		backgroundColor: '#ccc',
		borderRadius: '5px',
	};
	const bad = {
		color: 'red',
		border: 'red 3px solid',
		padding: '10px',
		backgroundColor: '#ccc',
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

	const handleNotification = (notification, newStatus) => {
		setNotification(notification);
		setStatus(newStatus);
		setTimeout(() => {
			setNotification('');
			setStatus({});
		}, 5000);
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			handleNotification(`login successfully! welcome ${user.name}.`, good);
			setUsername('');
			setPassword('');
		} catch (err) {
			handleNotification(err.response.data.error, bad);
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		try {
			window.localStorage.removeItem('loggedUser');
			blogService.setToken(null);
			setUser(null);
			handleNotification(`logout successfully! see you next time.`, good);
		} catch (err) {
			handleNotification(err.response.data.error, bad);
		}
	};

	const handleNewBlog = async (blog) => {
		blogFormRef.current.toggleVisibility();
		try {
			const newBlog = await blogService.create(blog);
			setBlogs(blogs.concat(newBlog));
			handleNotification(
				`a new blog ${blog.title} by ${blog.author} added.`,
				good
			);
		} catch (err) {
			handleNotification(err.response.data.error, bad);
		}
	};

	const handleLikes = async (blog) => {
    blog.likes++
    console.log(blog)
    try {
      const updatedBlog = await blogService.update(blog)
      console.log(updatedBlog)
      const updatedBlogs = blogs.fitler(blog => blog.id !== updatedBlog.id).concat(updatedBlog);
      setBlogs(updatedBlogs)
      handleNotification(
				`you liked ${blog.title} by ${blog.author} !`,
				good
			);
    } catch (err) {
      console.log(err)
      handleNotification(err.response.data.error, bad);
    }
	};

	const blogsDisplay = () => (
		<div>
			<h2>blogs</h2>
			<h3 style={status}>{notification}</h3>
			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>
			<ToggleVisibility
				buttonLabel='new blog'
				ref={blogFormRef}>
				<BlogForm handleNewBlog={handleNewBlog} />
			</ToggleVisibility>
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					name={user.name}
					handleLikes={handleLikes}
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
