const fs = require('fs')
const path = require('path')
const http = require('http')
const PORT = 3000

const server = http.createServer((req, res) => {
    console.log('server req')
    res.setHeader('Content-Type', 'text/html')
    const createPath = (page) => path.resolve(__dirname, 'pages', `${page}.html`)
    const createPathJSON = (page) => path.resolve(__dirname, 'pages', `${page}.json`)
    let basePath = ''



    switch (req.url) {
        case '/':
        case '/index':
        case '/main':
            basePath = createPath('index')
            break
        case '/page1':
            basePath = createPath('page1')
            break
        case '/page2':
            basePath = createPath('page2')
            break
        case '/page3':
            res.statusCode = 301
            res.setHeader('Location', 'index')
            res.end()
            break
        case '/database':
            basePath = createPathJSON('data')
            break
         default:
            basePath = createPath('error')
            break
    
    }



    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.write(data)
            res.end()
        }
    })


})
server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Listening at PORT ${PORT}`)
})
