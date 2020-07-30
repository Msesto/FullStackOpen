const commentsRouter = require('express').Router()
const { request } = require('../app')
const { response } = require('express')
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const reqUrl = request.originalUrl.substring(11, 35)
  console.log(reqUrl)
  const comments = await Comment
    .find({ blogId: reqUrl })
  return response.json(comments.map(each => each.toJSON()))
})

commentsRouter.post('/', async (request, response) => {
  const comment = new Comment(request.body)
  const blogUrl = request.originalUrl.substring(11, 35)
  const foundBlog = await Blog.findById(blogUrl)
  if (!foundBlog) {
    return response.status(400).json({ error: 'Blog is missing' })
  }
  if (comment.comment) {
    comment.blogId = blogUrl
    const savedComment = await comment.save()
    return response.status(201).json(savedComment.toJSON())
  }
  return response.status(400).json({ error: 'Comment is missing' })
})

module.exports = commentsRouter