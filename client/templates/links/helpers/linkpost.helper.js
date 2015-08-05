var tags = [];

Template.linkPost.onRendered(function(){
	Session.set('linkTags', null);
	Session.set('linkUrlError', null);
	Session.set('linkTitleLength', null);
	Session.set('linkUrlLength', null);
	Meteor.subscribe('user');
});

Template.linkPost.helpers({
	getTags: function(){
		var sessionTags = Session.get('linkTags');
		return sessionTags;
	},
	postSuccess: function(){
		return Session.get('postSuccess');
	},
	urlExists: function(){
		return Session.get('linkUrlError');
	},
	titleLength: function(){
		return Session.get('linkTitleLength');
	},
	urlLength: function(){
		return Session.get('linkUrlLength');
	},
	formDisabled: function(){
		return ( Session.get('postSuccess') || Session.get('linkUrlError') || Session.get('linkTitleLength') || Session.get('linkUrlLength'));
	}
});

Template.linkPost.events({
	"blur input[name='linkTitle']":function(event){
		event.preventDefault();
		var inputLength = $("input[name='linkTitle']").val().length;
		var check = {
			'required': !(inputLength > 0 && inputLength < 81),
			'max': (inputLength === 80)
		};
		if(check.required || check.max){
					Session.set('linkTitleLength', check);
					console.log(Session.get('linkTitleLength'));
		} else {
			Session.set('linkTitleLength', null);
		}

	},
	"blur input[name='linkUrl']":function(event){
		event.preventDefault();
		var exists = linkPostExists($("input[name='linkUrl']").val());

		var urlLength = $("input[name='linkUrl']").val().length;
		var urlCheck = {
			'required': !(urlLength > 0 && urlLength < 201),
			'max': (urlLength === 200)
		};
		if(urlCheck.required || urlCheck.max){
					Session.set('linkUrlLength', urlCheck);
		} else {
			Session.set('linkUrlLength', null);
		}

		Session.set('linkUrlError', exists);
	},
	"input input[name='linkTags']": function(event){
		event.preventDefault();
		var tags = $("input[name='linkTags']").val();
		var tagsArray = tags.split(/,|, /);
		
		Session.set('linkTags', tagsArray);
	},
	'submit form#linkPost' : function(event){
		event.preventDefault();
		var tags = Session.get('linkTags');
		var curDate = new Date();

		if(Meteor.user().services.google)
			var curName = Meteor.user().services.google.name;
		else
			var curName = Meteor.user().profile.name;

		var linkParams = {
			'title':$("input[name='linkTitle']").val(),
			'url':$("input[name='linkUrl']").val(),
			'postedOn':Date.parse(curDate),
			'postedBy':{
				'uid':Meteor.userId(),
				'name':curName
			},
			'tags':_.map(tags, function(t){
						t = t.trim();
						return t;
					}),
			'reported':false
		};
		Meteor.call('postLink', linkParams, function(error, result){
			if(error)
				console.error(error)
			else
				$('input').val('');
				Session.set('linkTags', null);
				Session.set('postSuccess', true);
				Session.set('linkUrlError', null);
				Session.set('linkTitleLength', null);
				Session.set('linkUrlLength', null);
				Meteor.setTimeout(function(){
					Session.set('postSuccess', null);

					Router.go('/');
				}, 2000);
		});
	}
});