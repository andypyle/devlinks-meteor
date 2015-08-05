Meteor.publish('linksList', function(limit){
	return Links.find({}, {limit: limit, sort:{postedOn: -1}});
});

Meteor.publish('linkPost', function(){
	if(this.userId){
		return Links.find({}, {fields: {'url':1}});
	} else {
		this.ready();
		console.error('Oops! You aren\'t logged in!');
	}
});

Meteor.publish('linksSearch', function(query){
	var sq = query.split(' ');

	if (!query) {
	    return Links.find({});
	}
	return Links.find({ $or:[{title:{$in: sq}}, {url:{$in: sq}}, {tags:{$all: sq}}]});
	//{ <field>: { $all: [ <value> , <value1> ... ] }
	
});

Meteor.publish('linksEdit', function(){
	if(this.userId){
		return Links.find({});
	} else {
		this.ready();
	}
});

Meteor.publish('singleLink', function(linkId){
	if(this.userId){
		Meteor._sleepForMs(2000);
		return Links.find({_id: linkId});
	} else {
		this.ready();
		console.error('Not logged in.');
	}
});

Meteor.publish('user', function(){
	if(this.userId){
		return Meteor.users.find({_id:this.userId});
	} else {
		this.ready();
		console.error('Not logged in.');
	}
})