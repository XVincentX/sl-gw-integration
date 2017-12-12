const path = require('path');
const gateway = require('express-gateway');
const idGen = require('uuid-base62');

const services = require('express-gateway/lib/services');
const credentialService = services.credential;
const userService = services.user;
const appService = services.application;

const appCredential = {
  secret: idGen.v4()
};


credentialService.insertScopes(['read', 'write'])
  .then(() => userService.insert({
    username: idGen.v4(),
    firstname: 'Clark',
    lastname: 'Kent',
    email: 'test@example.com'
  }))
  .then((user) => appService.insert({ name: 'appy', 'redirectUri': 'http://haha.com' }, user.id))
  .then((app) => credentialService.insertCredential(app.id, 'oauth2', appCredential))
  .then(credential => credentialService.addScopesToCredential(credential.id, 'oauth2', ['read', 'write']).then(() => credential))
  .then(credential => Object.assign(appCredential, credential))
  .then((c) => {
    console.log(c);
});

    const g = gateway()
      .load(path.join(__dirname, 'config'));
    const config = require('express-gateway/lib/config');
    config.gatewayConfig.http.port = process.env.PORT
    g.run();




