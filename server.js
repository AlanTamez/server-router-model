const express = require('express');
const app = express();

//Body parser es para que pueda ser utilizado correctamente los post
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const uuid = require('uuid');
//Router
const blogRouter = require('./router')

app.use('/blogs/api', jsonParser, blogRouter);

//port 8080 pero se puede poner cualquiera
app.listen(8080, () => {
  console.log('Your app is running in port 8080');
});

/*
//syntax possible because of express()
app.get('/blog-post', (req, res) => {
	//200 is for success
	res.status(200).json({
		message : "Succesfully sent the list of sports",
		status : 200,
		post : postArray
	});
});

app.get('/blog-post/:author', (req, res) =>{
	let blogAuthor = req.params.author;
	let flag = false;
    let aut = []

	if(blogAuthor == undefined){
        res.status(406).json({
            message: "Not Acceptable",
            status: 406
        });
    }
	//console.log("ID : ", sportId);

    postArray.forEach(item => {
        if(item.author == blogAuthor){
            flag = true;
            aut.push(item);
        }
    });

    //Se elimina el error de los headers
    //la bandera es solo para que cuando no exista ningun autor de los escritos marque 404
    if(flag){
        res.status(200).json({
            message: "Succesfully retrieved the author's posts",
            status: 200,
            post: aut
        });
    }else{
        res.status(404).json({
            message: "Author does not exist",
            status: 404
        });
    }
});

app.post('/blog-post/', jsonParser, (req, res) => {
	 let title = req.body.title;
     let content = req.body.content;
     let author = req.body.author;
     let publishDate = req.body.publishDate

     let prueba = ['title', 'content', 'author', 'publishDate'];

     for (let i = 0; i < prueba.length; i++) {
          let list = prueba[i];
          if (!(list in req.body)){
               res.status(406).json({
                    message: `Missing: ${list} `,
                    status: 406
               });
          }
     }

     let nuevo = {
          id: uuid.v4(),
          title: title,
          content: content,
          author: author,
          publishDate: publishDate

     };

     postArray.push(nuevo);
    
     res.status(201).json({
          message: "suceess",
          status: 201,
          new: nuevo
     });
});

app.delete('/blog-post/:id', jsonParser, (req, res) =>{
	let flag = false;

	//|| req.body.id == undefined
	if(req.params.id == undefined){
        res.status(406).json({
            message: "Missing: id",
            status: 406
        }); 
    }

    postArray.forEach(item => {
        if(item.id == req.params.id){
            postArray.splice(item, 1);
        	flag = true;
        }
    });

    if(flag){
    	//console.log("llegue");
    	//204 No content
    	res.status(204).json(); 
    }
    else{
    	res.status(404).json({
        	message: "id not found",
        	status: 404
    	});
    }
});

app.put("/blog-post/:id", jsonParser, (req, res) => {


	console.log(req.params.id);
	console.log(req.body.author);
    if(req.params.id == undefined){
        res.status(406).json({
            message: "missing id",
            status: 406
        }); 
    }

    //console.log(req.body.author);


    postArray.forEach(item=>{
        if(item.id == req.params.id){
           	if(req.body.title)
           		item.title = req.body.title;
           
           	if(req.body.content)
                item.content = req.body.content

           	if(req.body.author)
                item.author = req.body.author;
           	
           	if(req.body.publishDate)
               item.publishDate = req.body.publishDate;

            res.status(200).json({
            	message: "Successful Update",
                status: 200
           	});

        }
    });

    res.status(404).json({
        message: "Not found",
        status: 404
    });

    

});*/



//para postman en cargarlo se queda con la version previa cargada por eso sigue jalando aunque haya un error
//para no tener que matar y volver a correr el programa se isntaló en el cmd nodemon para que se actualice automaticamente