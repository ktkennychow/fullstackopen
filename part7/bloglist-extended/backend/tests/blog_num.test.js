const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.countLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{
      title: "fasdfdaf",
      author: "yoda",
      url: "www.google.com",
      likes: 9000
    }]

    const result = listHelper.countLikes(blogs)
    expect(result).toBe(blogs[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [{
      title: "sup1",
      author: "yoda",
      url: "www.google.com",
      likes: 9000
    },
    {
      title: "sup2",
      author: "yong",
      url: "www.facebook.com",
      likes: 12
    },
    {
      title: "sup3",
      author: "yoyo",
      url: "www.kitten.com",
      likes: 64209
    },]

    const result = listHelper.countLikes(blogs)
    expect(result).toBe(blogs[0].likes + blogs[1].likes + blogs[2].likes)
  })
})
describe('most of [something]', () => {
  const blogs = [{
    title: 'sup1',
    author: 'yoda',
    url: 'www.google.com/wowblog432',
    likes: 9000
  },
  {
    title: 'wth is google',
    author: 'yong',
    url: 'www.facebook.com/yoblog645',
    likes: 12
  },
  {
    title: 'sup2',
    author: 'yoda',
    url: 'www.kitten.com/catblog1',
    likes: 4324
  },
  {
    title: 'sup3',
    author: 'yoda',
    url: 'www.kitten.com/catblog3444',
    likes: 64209
  },
  {
    title: 'yolo',
    author: 'tigerman',
    url: 'www.pup.com/dogblog312321',
    likes: 64209
  },
  {
    title: 'yolo again',
    author: 'tigerman',
    url: 'www.pup.com/dogblog6676666',
    likes: 14
  }]

  test('of the blog(s) with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual([blogs[3], blogs[4]])
  })

  test('of the name of the author with the most blogs and the number of blogs', () => {
    const result = listHelper.mostBloggedAuthor(blogs)
    expect(result).toEqual({
      author: 'yoda',
      blogs: 3
    })
  })

  test('of the name of the author with the most likes and the number of likes', () => {
    const result = listHelper.mostLikedAuthor(blogs)
    expect(result).toEqual({
      author: 'yoda',
      likes: (64209 + 4324 + 9000)
    })
  })

})