const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { request } = require('../app')
const { response } = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    return response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    cponsole.log(decodedToken.id === token)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    blog.user = user._id
    if (blog.author && blog.title && blog.url) {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        return response.status(201).json(savedBlog.toJSON())
    }
    return response.status(400).json({ error: 'Name missing' })
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const toDelete = await Blog.findById(request.params.id)
    if (String(toDelete.user) === decodedToken.id) {
        const deleted = await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }
    return response.status(401).json({ error: 'unauthorized' })
})

blogsRouter.put('/:id', async (request, response) => {
    const { body } = request
    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    }
    const toUpdate = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    return response.status(200).json(toUpdate.toJSON())
})

module.exports = blogsRouter