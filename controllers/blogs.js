const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs.map(blog => blog.toJSON()))
    })
})

blogRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if(blog) {
                res.json(blog.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

blogRouter.post('/', (req, res, next) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
        .then((result) => {
            res.json(result.toJSON())
        }).catch((err) => {
            next(err)
        })
})

module.exports = blogRouter