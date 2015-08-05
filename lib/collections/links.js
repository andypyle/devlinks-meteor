Links = new Mongo.Collection('links');

Schema = {};

Schema.linkPost = new SimpleSchema({
	title: {
		type: String
	},
	url: {
		type: String,
		regEx: SimpleSchema.RegEx.Url
	},
	postedOn: {
		type: Number
	},
	postedBy: {
		type: Object,
		minCount: 1,
		maxCount: 1
	},
	"postedBy.uid":{
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	"postedBy.name":{
		type: String
	},
	tags: {
		type: [String],
		minCount: 1
	},
	reported: {
		type: Boolean
	}
});

Meteor.methods({
	postLink: function(params){
		if(this.userId){
			check(params, {
				title: String,
				url: String,
				postedOn: Number,
				postedBy: {
					uid: String,
					name: String,
				},
				tags: [String],
				reported: Boolean
			});

			return Links.insert(params);
		} else {
			throw new Meteor.Error('not-logged-in', 'You must be logged in to post.');
		}
	},
	editLink: function(params, doc){
		if(ownsDocument(this.userId, doc)){
			check(this.userId, String);
			check(doc, Object);
			check(params, {
				title: String,
				url: String,
				tags: [String]
			});

			return Links.update(doc._id, {$set:{title:params.title, url:params.url, tags:params.tags}});
		} else {
			throw new Meteor.Error('not-logged-in', 'You must be logged in to post.');
		}
	},
	deleteLink: function(doc){
		if(ownsDocument(this.userId, doc)){
			check(this.userId, String);

			Links.remove(doc._id, function(error){
				if(error)
					console.error(error);
				else
					console.log('Document removed.');
			})
		} else {
			console.error('Error: Permission denied.');
		}
	},
	reportLink: function(docId){
		if(this.userId){
			var link = Links.findOne(docId);
			if(link.reported)
				console.log('Link already reported.');
			else
				return Links.update(docId, {$set:{reported:true}});
		} else {
			console.error('Error: Permission denied.');
		}
	}
});

/*
if (Meteor.isServer) {
  Links._ensureIndex({
    "url": "text",
    "title": "text",
    "tags":"text"
  });
}
*/