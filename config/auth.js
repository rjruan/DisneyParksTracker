import passport from 'passport';
import OAuthStragety from 'passport-oauth';
const OAuth2Strategy = OAuthStragety.OAuth2Strategy;

passport.use('provider', new OAuth2Strategy({
    requestTokenURL: 'https://provider.com/oauth/request_token',
    accessTokenURL: 'https://provider.com/oauth/access_token',
    userAuthorizationURL: 'https://provider.com/oauth/authorize',
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/auth/provider/callback'
},
function(token, tokenSecret, profile, done) {
    User.findOrCreate({ oauthID: profile.id }, function (err, user) {
        return done(err, user);
    });
}));

