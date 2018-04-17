# express-4.x-steemconnect-userinfo-example
Using passport-steemconnect [Passport-SteemConnect](https://github.com/SMWARREN/Passport-SteemConnect)


This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) to authenticate users via SteemConnect.  Use
this example as a starting point for your own web applications.

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
$ npm install

1. Fill in your clientID, clientSecret, callbackURL
2. On line 62 put in the correct callBackURL currently set to '/auth/oauth/oauth2/callback'
passport.use(new Strategy({
  authorizationURL: `https://steemconnect.com/oauth2/authorize`,
  tokenURL: `https://steemconnect.com/oauth2/token`,
  clientID: ``,
  clientSecret: ``,
  callbackURL: ``,
  scope: ['offline', 'vote'],
  },
  
```
