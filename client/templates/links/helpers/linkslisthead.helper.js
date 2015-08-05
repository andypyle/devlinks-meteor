Template.linksListHead.onRendered(function(){

});

Template.linksListHead.helpers({

});

Template.linksListHead.events({
	'submit form#searchForm':function(event){
		event.preventDefault();
		var q = $("input.linkQuery").val();
		Router.go('search', {_id:q});
	}
});