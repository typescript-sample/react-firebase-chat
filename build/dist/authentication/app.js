import { AuthenticationClient } from 'authentication-component';
import { OAuth2Client } from 'authentication-component';
import axios from 'axios';
import { HttpRequest } from 'axios-core';
import { PasswordWebClient } from 'password-component';
import { SignupClient } from 'signup-component';
import { options, storage } from 'uione';
var ApplicationContext = /** @class */ (function () {
    function ApplicationContext() {
        this.httpRequest = new HttpRequest(axios, options);
    }
    ApplicationContext.prototype.getConfig = function () {
        return storage.config();
    };
    ApplicationContext.prototype.getSignupService = function () {
        if (!this.signupService) {
            var c = this.getConfig();
            this.signupService = new SignupClient(this.httpRequest, c.signup_url + '/signup', c.signup_url);
        }
        return this.signupService;
    };
    ApplicationContext.prototype.getAuthenticator = function () {
        if (!this.authenticator) {
            var c = this.getConfig();
            this.authenticator = new AuthenticationClient(this.httpRequest, c.authentication_url + '/authenticate');
        }
        return this.authenticator;
    };
    ApplicationContext.prototype.getPasswordServicer = function () {
        if (!this.passwordService) {
            var c = this.getConfig();
            this.passwordService = new PasswordWebClient(this.httpRequest, c.password_url);
        }
        return this.passwordService;
    };
    ApplicationContext.prototype.getOAuth2Service = function () {
        if (!this.oauth2Service) {
            var c = this.getConfig();
            this.oauth2Service = new OAuth2Client(this.httpRequest, c.oauth2_url + '/authenticate', c.oauth2_url + '/configurations');
        }
        return this.oauth2Service;
    };
    return ApplicationContext;
}());
export var context = new ApplicationContext();
//# sourceMappingURL=app.js.map