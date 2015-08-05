Accounts.onLogin(function(){
	Meteor.subscribe('user');
	console.log(Meteor.user());
});