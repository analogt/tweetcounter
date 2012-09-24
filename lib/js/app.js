
$(function(){



var TweetCount = {
	models:{},
	collections:{},
	views:{},
	templates:{}
}

//Models
TweetCount.models.Word = Backbone.Model.extend({});
//Collections
TweetCount.collections.Words = Backbone.Collection.extend({
		model:TweetCount.models.Word
})
//Views
TweetCount.views.Word_View = Backbone.View.extend({

	template: _.template($('#template-word').html()),
	
	initialize: function() {
		_.bindAll(this,"render","addOne")
		this.collection.bind("reset", this.render);
		this.collection.bind("add", this.addOne)
	},
	render: function(){
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	addAll: function() {
		this.collection.each(this.addOne);
	},
	addOne: function(model){
		$(".word_container").append(this.template(model.toJSON()))
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
				//$(".word_container").append('<div class="word" style="float:right;font-size:'+size+'em">'+word+"</div>")
			}
		}
	}
	var words_test = new TweetCount.collections.Words(words)
	var words_view = new TweetCount.views.Word_View({collection:words_test});

	words_view.addAll()
	console.log(words_test);
}

});