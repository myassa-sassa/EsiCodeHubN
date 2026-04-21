
// // 404
// export const notFound = (req, res, next) => {
//     res.status(404).json({ message: "Route not found" });
//     next();
// }


// // error handler
// export const errorHandler = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "Internal Server Error"  });
//     next();
// }

// const middleware = {
//     notFound: notFound,
//     errorHandler: errorHandler
// }
// export default middleware;

/***********common js ******/

// middleware/middleware.js (version CommonJS)

// 404
const notFound = (req, res, next) => {
    res.status(404).json({ message: "Route not found" });
    next();
}

// error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
    next();
}

const middleware = {
    notFound: notFound,
    errorHandler: errorHandler
}

module.exports = middleware;