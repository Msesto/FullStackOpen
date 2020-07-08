const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (acc, current) => acc + current.likes
    return Number(blogs.reduce(reducer, 0))
}

const favoriteBlog = (blogs) => {
    const reducer = (acc, current) => current.likes > acc.likes ? acc = { likes: current.likes, author: current.author, title: current.title } : acc = acc
    return blogs.reduce(reducer, { likes: 0 })
}

const mostBlogs = (blogs) => {
    const reducer = (acc, current) => {
        let author = current.author
        acc.hasOwnProperty(author) ? acc[author] = acc[author] + 1 : acc[author] = 1
        return acc
    }
    const authors = Object.entries(blogs.reduce(reducer, {}))
    const top = authors.reduce((acc, curr) => curr[1] > acc[1] ? acc = curr : acc = acc)
    return { author: top[0], blogs: top[1] }
}

const mostLikes = (blogs) => {
    const reducer = (acc, current) => {
        let author = current.author
        acc.hasOwnProperty(author) ? acc[author].likes += current.likes : acc[author] = { likes: current.likes }
        return acc
    }
    const authors = Object.entries(blogs.reduce(reducer, {}))
    const top = authors.reduce((acc, curr) => curr[1].likes > acc[1].likes ? acc = curr : acc)
    return { author: top[0], likes: top[1].likes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}