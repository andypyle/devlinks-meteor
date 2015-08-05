Accounts.onCreateUser(function (options, user) {
    if(user.services.github){
        var accessToken = user.services.github.accessToken,
            result,
            profile;
        result = Meteor.http.get("https://api.github.com/user", {
            params: {
                access_token: accessToken
            },
            headers: {
                'User-Agent': 'devLinksMeteor'
            }
        });
        if (result.error)
            throw result.error;

        profile = _.pick(result.data,
            "name",
            "avatar_url",
            "email",
            "html_url");

        user.profile = profile;

        return user; 
    } else {
        return user;
    }
});