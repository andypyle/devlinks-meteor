Template.link.onRendered(function(){
	var el = $(this.firstNode).parent();
	el.hide()
		.velocity('transition.slideUpBigIn', {duration: 750, stagger: 100, display:'flex'});

	var editPanel = $(this.lastNode);
	editPanel.hide();
});

Template.link.helpers({
	ownsLink: function(){
		return ownsDocument(Meteor.userId(), this);
	}
});
visible = false;
Template.link.events({
	'click .toggleEdit': function(event){
		event.preventDefault();
		var editToggle = $(Template.instance().lastNode);
		var toggleBtn = $(Template.instance().firstNode).parent().find('.linkEditToggle');

		if(!visible){
			editToggle.velocity(
				'transition.slideDownIn',
				{display:'flex',
				duration:200,
				complete: function(){
					visible = true;
				}});

			toggleBtn.velocity({
				rotateZ:'90deg'
			}, {duration: 200},"easeInSine");

		} else {
			editToggle.velocity(
				'slideUp',
				{display:'none',
				duration:200,
				complete: function(){
					visible = false;
				}});

			toggleBtn.velocity({
				rotateZ:'0deg'
			}, {duration: 200},"easeInSine");
		}
	},
	'click .linkEditDelete a.linkReport, .linkEditDelete a.linkDelete':function(event){
		event.preventDefault();
		var editToggle = $(Template.instance().lastNode);
		var toggleBtn = $(Template.instance().firstNode).parent().find('.linkEditToggle');

		if(visible){
			editToggle.velocity(
				'slideUp',
				{display:'none',
				duration:200,
				complete: function(){
					visible = false;
				}});

			toggleBtn.velocity({
				rotateZ:'0deg'
			}, {duration: 200},"easeInSine");
		} else {
			return false;
		}
	},
	'click .linkDelete':function(event){
		event.preventDefault();
		var deletePrompt = confirm('Delete ' + this.title + '?');
		if(deletePrompt){
			Meteor.call('deleteLink', this);
		} else {
			console.error('Document not removed.');
		}
	},
	'click .linkReport':function(event){
		event.preventDefault();		
		if(!this.reported){
			var reportPrompt = confirm('Report link: ' + this.title + '?');
			if(reportPrompt){
				Meteor.call('reportLink', this._id);
			} else {
				console.error('Not reported.');
			}
		} else {
			return false;
		}
	}
});

Template.link.onDestroyed(function(){
	var el = $(this.firstNode).parent();
	el.velocity('transition.bounceOut', {duration: 750, stagger: 100, display:'flex'});
});