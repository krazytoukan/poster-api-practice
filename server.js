require("dotenv").config()

const
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    axios = require('axios'),
    PORT = 3000


const apiClient = axios.create()
const apiKey = `${process.env.API_KEY}`


app.get('/search/:term', (req, res)=>{
    const apiUrl = `http://www.omdbapi.com/?s=${req.params.term}&apikey=${apiKey}`
    apiClient({method: "get", url: apiUrl}).then((apiData) => {
        console.log(apiData.data.Search)
        let results = ""
        apiData.data.Search.forEach((r) => {
            let poster = r.Poster
            let title = r.Title
            results += `<h1>${title}</h1><img src="${poster}" alt="Looks like there's no poster URL">`
        });
        res.send(results)
    })
})

app.listen(PORT, (err) => {
    console.log(err || "It's alive")
})