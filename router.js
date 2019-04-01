const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const router = express.Router();

const uuid = require('uuid');
//we need to specify we want to use the model here
const {ListBlogs} = require('./model');

router.get('/list-blogs', (req, res, next) => {
	//this particular endpoint will ask to the model
	let allblogs = ListBlogs.get();

	if (!allblogs) {
        res.status(500).json({
            message: `Internal server error`,
            status: 500,
        });
        //con el next ya no entra a lo siguiente
        return next();
    }

    res.status(200).json({
        message: "Successfully sent the list of posts",
        status: 200,
        posts: allblogs
    });
});

router.get('/list-blogs/:author', (req, res, next) => {
	let blogauthor = req.params.author;
	let allblogs = ListBlogs.get();
	let aut = []

	if (!blogauthor) {
        res.status(406).json({
            message: "Author not found in path",
            status: 406
        });
        return next();
    }

	allblogs.forEach(item => {
		if (item.author == blogauthor){
			aut.push(item);
		}
	});

	if(aut.length == 0){
		res.status(404).json({
			message : "Author not found in the list",
			status : 404
		});
		return next();
	}

	res.status(200).json({
		message : "Successfully author found",
		status : 200,
		blogs : aut
	});
});

router.post('/list-blogs', jsonParser, (req, res, next) => {
	
	let requiredFields = ['title', 'content', 'author', 'publishDate'];

	for (let i = 0; i < requiredFields.length; i++){
		let currentField = requiredFields[i];
		if (!(currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			}).send("Finish");
			return next();
		}
	}

	let objectToAdd = {
		id: uuid.v4(),
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: new Date(req.body.publishDate)
	};

	ListBlogs.post(objectToAdd);
	res.status(201).json({
		message : "Successfully added the sport",
		status : 201,
		sport : objectToAdd
	});
});

router.delete('/list-blogs/:id', jsonParser, (req, res, next) =>{
	let flag = false;
	let count = -1;
	let newcount;


	if (!(req.params.id)){
        res.status(406).json({
            message: "id not found in path",
            status: 406
        });
        return next();
    }

    let allblogs = ListBlogs.get();

    allblogs.forEach(item => {
    	count++;
        if(item.id == req.params.id){
            //postArray.splice(item, 1);
            newcount = count;
        	flag = true;
        } 
    });

    if(!(flag)){
    	res.status(404).json({
        	message: "id not found",
        	status: 404
    	});
    	return next();
    }

    ListBlogs.delete(newcount);
    res.status(204).send("Finish");
});

router.put('/list-blogs/:id', jsonParser, (req, res, next) =>{
	let postId = req.params.id;
	//console.log(postId);
	if (postId == undefined){
        res.status(406).json({
            message: "id not found in path",
            status: 406
        });
        return next();
    }	
   	
   	let postTitle = req.body.title;
    let postContent = req.body.content;
    let postAuthor = req.body.author;
    let postPublishDate = req.body.publishDate;

    if (!postTitle && !postContent && !postAuthor && !postPublishDate) {
        res.status(404).json({
            message: "At least one field is require",
            status: 404
        });
        return next();
    }

    let postFlag = ListBlogs.put(postId, postTitle, postContent, postAuthor, postPublishDate);

    if (!postFlag) {
        res.status(500).json({
            message: "id not found",
            status: 500,
        });
        return next();
    }
    res.status(200).json({
        message: "Successfully updated post",
        status: 200,
    });
});

module.exports = router;