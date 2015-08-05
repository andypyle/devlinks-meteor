linkExists = function(linkUrl, docId){
	var queryByUrl = (Links.findOne({url:linkUrl})) ? Links.findOne({url:linkUrl}):false;
	var queryDoc = Links.findOne(docId);

	if(queryByUrl)
		var owner = (queryByUrl.postedBy.uid === queryDoc.postedBy.uid) ? true:false;

	if(queryByUrl && owner)
		return false;
	else if (queryByUrl && !owner)
		return true;
	else if (!queryByUrl)
		return false;
}

linkPostExists = function(linkUrl){
	var queryUrl = (Links.findOne({url:linkUrl})) ? true:false;

	return queryUrl;
}