var http = require('http');
var https = require('https');
const apis = [
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/posts/59",
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts/178",
    "https://jsonplaceholder.typicode.com/comments",
    "https://jsonplaceholder.typicode.com/users/987",
    "https://jsonplaceholder.typicode.com/albums",
    "https://jsonplaceholder.typicode.com/todos/967",
    "https://jsonplaceholder.typicode.com/comments/732",
    "https://jsonplaceholder.typicode.com/photos",
    "https://jsonplaceholder.typicode.com/todos",
    "https://jsonplaceholder.typicode.com/photos/800"
]

var success_data = []
var failed_data = []  

const server = http.createServer( async (req, res) => {
        await apis.map(async (api) => {
             await https.get(api, res => {
                 console.log(res.statusCode)
            if(res.statusCode === 200)
            {
                console.log('hii')
                success_data.push({
                    endpoint:api,
                    status:200
                })
            }

            else{
                console.log('hello')
                failed_data.push({
                    endpoint:api,
                    status:500
                })
            }
        })
    })
        res.writeHead(200, { 'Content-Type': 'application/json' });
        let apiData = {
            success:true,
            message:'Nice Message',
            data:{
                success:success_data,
                failed:failed_data
            }

        }
        res.end(JSON.stringify(apiData));
  


})


server.listen(3000, function(){
 console.log("server start at port 3000"); 
});