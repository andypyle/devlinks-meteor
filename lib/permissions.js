ownsDocument = function(userId, doc){
	return doc.postedBy.uid === userId;
}