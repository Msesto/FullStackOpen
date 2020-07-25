const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let token

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const uniqueUser = new User({ username: "root", name: "super-user" })
    const userForToken = {
        username: uniqueUser.username,
        id: uniqueUser._id,
    }
    token = jwt.sign(userForToken, process.env.SECRET)

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => {
        blog['user'] = uniqueUser._id
        blog.save()
    })
    await Promise.all(promiseArray)
})

describe('Get blogs', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('specific blog return with id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined();
    })
})

describe('Post blogs', () => {
    test('Unauthorized token returns correct error code', async () => {
        const newBlog = {}
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + 'fake token')
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    test('Empty POST will not be saved', async () => {
        const newBlog = {}
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('A valid blog can be added ', async () => {
        const newBlog = {
            title: 'Mystiques diaries',
            author: 'Mystique Dubois',
            url: 'https://mystique.party/dubois/diaries',
            likes: 69,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    })

    test('Missing like information, defaults to 0', async () => {
        const newBlog = {
            title: 'Mystiques diaries',
            author: 'Mystique Dubois',
            url: 'https://mystique.party/dubois/diaries',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0)
    })
})

describe('Deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const url = blogsAtEnd.map(r => r.url)

        expect(url).not.toContain(blogToDelete.url)
    })
})

describe('Update of a blog', () => {
    test('succeeds if id is valid and passes validation', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updatedBlog = {
            likes: 8,
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/'
        }
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        expect(blogsAtEnd[0].likes).toBe(8)
    })
})




afterAll(() => {
    mongoose.connection.close()
})