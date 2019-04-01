const uuid = require('uuid');
let postDB = [
					{
						id: uuid.v4(),
						title: "First Post",
						content: "This is the content of my first post",
						author: "AlanTamez",
						publishDate: new Date(2018, 11, 24)
					},
					{
						id: uuid.v4(),
						title: "Second Post",
						content: "This is the content of my second post",
						author: "AlanTamez",
						publishDate: new Date(2019, 3, 19)
					},
					{
						id: uuid.v4(),
						title: "Another Post",
						content: "This is the content of another post",
						author: "ClementeYañez",
						publishDate: new Date(2019, 1, 20)
					}
				];

//this is an object and we create methods
const ListBlogs = {
	get : function(){
		return postDB;
	},

	post : function(item){
		postDB.push(item);
	},

	delete : function(count){
		//console.log(count);
		postDB.splice(count, 1);
	},

	put : function(pId, pTitle, pContent, pAuthor, pDate){
		//console.log(pId);
		for(let i = 0; i< postDB.length; i++){
			if(pId == postDB[i].id){
				if(pTitle){
					postDB[i].title = pTitle;
					//console.log("title");
				}
				if(pContent){
					postDB[i].content = pContent;
					//console.log("content");
				}
				if(pAuthor){
					postDB[i].author = pAuthor;
					//console.log("author");
				}
				if(pDate){
					postDB[i].publishDate = pDate;
					//console.log("Date");
				}
			return true;
			}
		//	console.log(postDB[i].id);
		}
		return false;

		/*postDB.forEach(item => {
			console.log("hola");
			if(pId == postDB.id){
				console.log("holasi");
				if(pTitle){
					postDB.title = pTitle;
					console.log("title");
					flag = true;
				}
				if(pContent){
					postDB.content = pContent;
					console.log("content");
					flag = true;
				}
				if(pAuthor){
					postDB.author = pAuthor;
					console.log("author");
					flag = true;
				}
				if(pDate){
					postDB.publishDate = pDate;
					console.log("Date");
					flag = true;
				}
			}
			return flag;
		});*/
	}
}

//making it accesible
//this could be a database
module.exports = {ListBlogs};