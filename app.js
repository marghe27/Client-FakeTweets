// JavaScript Document

//Aggiungere un Tweet
//Eliminare un Tweet
//Leggere la lista dei Tweet in base ad uno specifico author
//Leggere la lista dei Tweet in base ad uno specifico word
//Leggere uno specifico tweet in base all’id.

var app = new Vue({

	el: "#app",

	data: {
		//message: "Hello Vue!",
		toggle: true,
		condition:true,
		search:'',
		str:'',
		tweets: [],
		id:"",
		author: "",
		message: "",


	},

	methods: {



//Aggiungere un Tweet
		addTweet: function () {
			this.$http.post('http://localhost:3001/tweets', {

        		author: this.author,
				message: this.message	

				})
				.then(response => {
					//console.log(response);
				})
				.catch(error => {
					console.log("post error", error);
				});
		},
		
		
//Leggere la lista dei Tweet 

		loadTweet() {
			fetch('http://localhost:3001/tweets')
				.then((response) => {
					return response.json();
				})
				.then((response) => {
					this.tweets = response;
					for (var item of this.tweets) {
						item.visible = true;
					}
				})
				.catch(function (err) {
					console.log("err:", err);
				});
			
		},
		
//Eliminare un Tweet		
		deleteTweet: function () {
			var url = 'http://localhost:3001/tweets/' + this.id;
			this.$http.delete(url).then(response => {
				this.tweets = response.body;
				
			});

		},

//Leggere uno specifico tweet in base all’id.		
		readListById: function () {
			this.$http.get('http://localhost:3001/tweets/' + this.id)

			.then(response => response.json())
				.then(response => {
					this.tweets = response;
					console.log(response.body);
				});

		},
		
		//Leggere la lista dei Tweet in base ad uno specifico author
		
		readListByAuthor: function () {
			this.$http.get('http://localhost:3001/tweets?author=' + this.author)

			.then(response => response.json())
				.then(response => {
					this.tweets = response;
					console.log(response.body);
				});

		},

		
	
		
	},
	
	computed: {
    // CERCA STRINGA DENTRO NAME O DESCRIPTION
		
		  filteredList() {
		  	return this.tweets.filter(post => {
		  		return post.author.toLowerCase().includes(this.search.toLowerCase())||
					post.message.toLowerCase().includes(this.search.toLowerCase());
		  	})
		  },
 

		
  },


	created: function () {
		this.deleteTweet();
		this.addTweet();
		this.loadTweet();
		
		this.readListById();
		this.readListByAuthor();
		
		this.filteredList()
	}


});
