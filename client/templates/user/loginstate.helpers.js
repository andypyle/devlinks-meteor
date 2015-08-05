Template.loginState.events({
	'click .logOutBtn': function(){
		return Meteor.logout(function(){
			console.log('Logged out.');
		});
	}
});