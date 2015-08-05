Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function(){
		
	}
});

Router.map(function(){
	this.route('home', {
		path: '/',
		template: 'linksList'
	});

	this.route('search', {
		path: '/search/:_id',
		template: 'linksSearch',
		waitOn: function(){
			return Meteor.subscribe('linksSearch', this.params._id);
		},
		data: function(){
			return Links.find({});
		}
	});

	this.route('about', {
		path: '/about',
		template: 'about'
	});

	this.route('linkPost', {
		path: '/linkpost',
		template: 'linkPost',
		waitOn: function(){
			return Meteor.subscribe('linkPost');
		}
	});

	this.route('linkEdit', {
		path: '/linkedit/:_id',
		template: 'linkEdit',
		waitOn: function(){
			return Meteor.subscribe('linksEdit');
		},
		data: function(){
			return Links.findOne({_id:this.params._id});
		}
	});
});

Router.plugin('ensureSignedIn', {
    except: ['home', 'search', 'signin', 'about']
});

AccountsTemplates.configureRoute('ensureSignedIn', {
	redirect: '/'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'userSignIn',
    layoutTemplate: 'layout',
    redirect: '/',
});