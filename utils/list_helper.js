// const _ = require('lodash')

const dummy = (blogs) => {
    if(blogs.length > 1) {
        return 1
    }
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    let reducer = (prev, current) => {
        return prev.likes > current.likes ? prev : current
    }

    return blogs
        .map(blog => {
            return {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        })
        .reduce(reducer, {})
}

const mostBlogs = (blogs) => {
    let authors = blogs.map(blog => blog.author)

    let person = {}
    let count = 0
    let author

    for(let i = 0; i<authors.length; i++) {
        let name = authors[i]
        if(person[name] === undefined) {
            person[name] = 1
        } else {
            person[name] += 1
        }
        if(person[name] > count) {
            count = person[name]
            author = name
        }
    }
    return {
        author: author,
        blogs: count
    }
}

const mostLikes = (blogs) => {
    let authors = blogs.map(blog => blog.author)
    let names = [...new Set(authors)]

    let person = {}
    let count = 0
    let author

    for(let i = 0; i < blogs.length; i++) {
        for(let j = 0; j < authors.length; j++) {
            let name = names[i]

            if(person[name] === undefined && blogs[j].author === name) {
                person[name] = blogs[j].likes
            } else if(blogs[j].author === name) {
                person[name] = person[name] + blogs[j].likes
            }

            if(person[name] > count) {
                author = name
                count = person[name]
            }
        }
    }
    return {
        author: author,
        likes: count
    }
}

module.exports= { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }