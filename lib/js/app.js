
$(function(){



var TweetCount = {
	models:{},
	collections:{},
	views:{},
	templates:{}
}
//Models
TweetCount.models.word = Backbone.Model.extend({
	initialize:function(){

	}
})
//Collections
TweetCount.collections.word_collection = Backbone.Collection.extend({
	model:TweetCount.models.word
})
/*

TweetCount.Templates.word = _.template($("#word-template").html())
TweetCount.Views.word = Backbone.View.extend({
	el: $("#content"),
	template: TempSpend.Templates.projects,
	
	initialize: function() {
		_.bindAll(this,"render","addOne")
		this.collection.bind("reset", this.render);
		this.collection.bind("add", this.addOne)
	},
	render: function(){
		$(this.el).html(this.template());
		this.addAll();
	},
	addAll: function() {
		this.collection.each(this.addOne);
	},
	addOne: function(model){
		view = new TempSpend.Views.Project({model:model});
		$(".projects", this.el).append(view.render());
	}
})
*/
TweetCount.Router = Backbone.Router.extend({
	routes: {
		"":"defaultRoute" 
	},
	defaultRoute: function() {
		//Initialize Project Collection

		//Initialize Views
		//new TweetCount.Views.Project_List({collection:TweetCount.projects});
	}
})

processFreq = function(data){
	var words = []
	$(".word_container").html('')
	for(word in data.word_count)
	{
		if (data.word_count.hasOwnProperty(word))
		{
			if(data.word_count[word]>1){
				words.push({
					word:word,
					count:data.word_count[word]
				})
				var size = data.word_count[word]/2
				if(size>8){size=8};
				$(".word_container").append('<div class="word" style="float:right;font-size:'+size+'em">'+word+"</div>")
			}
		}
	}
	var words = new TweetCount.collections.word_collection(words)
	console.log(words);
}

var appRouter = new TweetCount.Router();
Backbone.history.start()
});