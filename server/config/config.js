const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: "S2Yedkj%7",
        DATABASE: "mongodb+srv://sayeed09:s786ayeed@cluster0-h8bc1.mongodb.net/bookShelf?retryWrites=true&w=majority"//"mongodb://localhost:27017/bookShelf"
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}