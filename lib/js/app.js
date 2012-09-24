
$(function(){



var TweetCount = {
	models:{},
	collections:{},
	views:{},
	templates:{},
	colors :["#D3C9CE","#F3D28E","#ECE59A","#B2CCE0","#93A4BD","#F0AB7F"]
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
		var random_color_index = Math.floor(Math.random() * (TweetCount.colors.length - 0 + 1)) + 0
		model.set('color',TweetCount.colors[random_color_index])
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
			if(data.word_count[word]>1)
			{
				words.push({
					word:word,
					count:data.word_count[word]
				})
			}
		}
	}
	var words_test = new TweetCount.collections.Words(words)
	var words_view = new TweetCount.views.Word_View({collection:words_test});

	words_view.addAll()
}

});