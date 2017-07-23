exports.send = function(response, code){
    response.writeHead(code,{'Content-Type':'text/html'});
    if(code == 404){
        response.end(code+" Page Not Found");
    }else if(code == 500){
        response.end(code+" Internal Server Error");
    }
}