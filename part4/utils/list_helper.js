const _ = require('lodash');

const dummy = (blogs) => {
  const blog = {
    title: "fasdfdaf",
    author: "yoda",
    url: "www.google.com",
    likes: "9000"
  }
  return blogs.push(blog)
}

const countLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog)=> {
    return sum + blog.likes
  }, 0)

  return blogs.length === 0 ? 0 : likes
}

const favoriteBlog = (blogs) => {
  const listOfLikes = blogs.map(blog => blog.likes)
  console.log("check list of likes", listOfLikes)
  const mostLikes = Math.max(...listOfLikes)
  console.log("check most likes", mostLikes)
  const mostLikedBlog = blogs.filter(blog => blog.likes === mostLikes)

  return mostLikedBlog
}

const mostBloggedAuthor = (blogs) => {
  // const listOfAuthors = blogs.map(blog => blog.author)
  
  const authorWithBlogs = blogs.reduce((authorWithBlogs, blog)=>{
    authorWithBlogs[blog.author] = authorWithBlogs[blog.author] || {};
    authorWithBlogs[blog.author].author = blog.author
    authorWithBlogs[blog.author].hasOwnProperty('blogs') ? authorWithBlogs[blog.author].blogs++ : authorWithBlogs[blog.author].blogs = 1
    return authorWithBlogs
  }
  ,{})
  console.log(43242342,authorWithBlogs)
  const mostBloggedAuthor = Object.keys(authorWithBlogs).reduce((mostBloggedAuthor, author) => {
    console.log(authorWithBlogs[author].blogs)
    let currHighest = authorWithBlogs[author].blogs
    if (mostBloggedAuthor.blogs < currHighest) {
      mostBloggedAuthor.author = authorWithBlogs[author].author
      mostBloggedAuthor.blogs = authorWithBlogs[author].blogs
    }

    return mostBloggedAuthor
  }, {author: "", blogs: 0})

  return mostBloggedAuthor
}

const mostLikedAuthor = (blogs) => {
  // const listOfAuthors = blogs.map(blog => blog.author)
  
  const authorWithBlogs = blogs.reduce((authorWithBlogs, blog)=>{
    authorWithBlogs[blog.author] = authorWithBlogs[blog.author] || {};
    authorWithBlogs[blog.author].author = blog.author
    authorWithBlogs[blog.author].hasOwnProperty('likes') ? authorWithBlogs[blog.author].likes += blog.likes : authorWithBlogs[blog.author].likes = blog.likes
    return authorWithBlogs
  }
  ,{})

  console.log(43242342,authorWithBlogs)
  const mostLikedAuthor = Object.keys(authorWithBlogs).reduce((mostLikedAuthor, author) => {
    console.log(authorWithBlogs[author].likes)
    let currHighest = authorWithBlogs[author].likes
    if (mostLikedAuthor.likes < currHighest) {
      mostLikedAuthor.author = authorWithBlogs[author].author
      mostLikedAuthor.likes = authorWithBlogs[author].likes
    }

    return mostLikedAuthor
  }, {author: "", likes: 0})

  return mostLikedAuthor
}

module.exports = {
  dummy,
  countLikes,
  favoriteBlog,
  mostBloggedAuthor,
  mostLikedAuthor,
}