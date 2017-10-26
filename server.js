var http = require('http');
var fs = require('fs');
var server = http.createServer((req, res)=>{
	console.log(req.url);
	if(req.url === '/'){
		var homePageHTML = renderHomePage();
		res.writeHead(200,{'content-type' : 'text/html'});
		res.end(homePageHTML);
	}else if(req.url === '/error-image.jpg'){
		var imageToLoad = renderImage('error');
		res.writeHead(200,{'content-type' : 'image/png'});
		res.end(imageToLoad);
	}else if(req.url === '/forbidden-image.jpg'){
		var imageToLoad = renderImage('forbidden');
		res.writeHead(200,{'content-type' : 'image/png'});
		res.end(imageToLoad);
	}else if(req.url === '/internal'){
		var internalStopHTML = renderInternalPage();
		res.writeHead(200,{'content-type' : 'text/html'});
		res.end(internalStopHTML);
	}else{
		var errorPageHTML = renderErrorPage();
		res.writeHead(404,{'content-type' : 'text/html'});
		res.end(errorPageHTML);
	}
	res.writeHead(200,{'content-type':'text/html'});
	res.end();
})
console.log("local port 8000 is listening for connection");
server.listen(8000);

function renderHomePage(){
	var theHTMLToGet = fs.readFileSync('homePage.html');
	return theHTMLToGet;
}

function renderErrorPage(){
	var theErrorPageToGet = fs.readFileSync('errorPage.html');
	return theErrorPageToGet;
}
function renderInternalPage(){
	var theForbiddenPage = fs.readFileSync('forbiddenPage.html');
	return theForbiddenPage;
}

function renderImage(error){
	var imageToRender = fs.readFileSync(`${error}-image.jpg`);
	return imageToRender;
}