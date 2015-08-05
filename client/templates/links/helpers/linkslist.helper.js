Template.linksList.onCreated(function(){
	var instance = this;

	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(6);

	instance.autorun(function(){
		var limit = instance.limit.get();

		console.log('Asking for ' + limit + ' links.');

		var sub = instance.subscribe('linksList', limit);

		if(sub.ready()){
			console.log('Received ' + limit + ' links.');
			instance.loaded.set(limit);
		} else {
			console.log('Subscription not ready yet.');
		}
	});

	instance.postsAll = function(){
		return Links.find({}, {limit: instance.loaded.get(), sort:{postedOn: -1}});
	}
});

Template.linksList.helpers({
	linksList: function(){
		return Template.instance().postsAll();
	},
	morePosts: function(){
		return Template.instance().postsAll().count() === Template.instance().limit.get();
	}
});

Template.linksList.events({
	'click .loadMore':function(event, instance){
		event.preventDefault();

		var limit = instance.limit.get();

		limit += 6;
		instance.limit.set(limit);

		$("html").velocity("scroll", { duration:375, delay: 750, offset: "750px", mobileHA: false });
	}
});