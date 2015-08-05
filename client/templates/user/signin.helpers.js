Template.userSignIn.helpers({

});

Template.userSignIn.events({
	'click .loginGit':function(event){
		event.preventDefault();
		Meteor.loginWithGithub({
		  loginStyle: "popup"
		}, function (err) {
			if (err)
		    	Session.set('errorMessage', err.reason || 'Unknown error');
		});
	},
	'click .loginGoogle':function(event){
		event.preventDefault();
		Meteor.loginWithGoogle({
		  loginStyle: "popup"
		}, function (err) {
			if (err)
		    	Session.set('errorMessage', err.reason || 'Unknown error');
		});
	}
});