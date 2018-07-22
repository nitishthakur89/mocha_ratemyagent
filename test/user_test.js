var should = require('chai').should();
expect = require('chai').expect;
supertest = require('supertest');

var path = require('path');
var fs = require('fs');
var assert = require('assert');
var argv = require('optimist').demand('config').argv;
var configFilePath = argv.config;
assert.ok(fs.existsSync(configFilePath), 'config file not found at path: ' + configFilePath);
var config = require('nconf').env().argv().file({ file: configFilePath });
var apiConfig = config.get('api_data');
var apiKey = apiConfig.url;
console.log(apiKey);
var email = apiConfig.email;
var pwd = apiConfig.password;
api = supertest(apiKey);
//api = supertest('https://api.ratemyagent.com.au');
var Cookies;

describe('User', function () {
    before(function (done) {
        api.post('/Account/Login')
            .set('Accept', 'application/json')
            .send({

                email: email,
                password: pwd,

            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                // Save the cookie to use it later to retrieve the session
                Cookies = res.headers['set-cookie'].pop().split(';')[0];
                done();
            });


    });

    it('GET method for shortlist agent using mocha 1', function (done) {
        var req = api.get('/Users/Me/Shortlist/Agents/')
            .set('Accept', 'application/json')
        // Set cookie to get saved user session
        req.cookies = Cookies;

        req.expect(200)
            .end(function (err, res) {
              //this test should pass and test for agent name.
                expect(res.body.Results[0].AgentName).to.include('Tim Heavyside');
                //expect(res.body.Total).to.equal(1);// passed
                console.log(res.body)
                done();
            });
    });

    it('GET method for shortlist agent using mocha 2', function (done) {
        var req = api.get('/Users/Me/Shortlist/Agents/')
            .set('Accept', 'application/json')
        // Set cookie to get saved user session
        req.cookies = Cookies;

        req.expect(200)
            .end(function (err, res) {
                // this test should pass and check for agency name
                expect(res.body.Results[0].AgencyName).to.include('Fletchers Canterbury');
                //expect(res.body.Total).to.equal(1);// passed
                console.log(res.body)
                done();
            });
    });

    it('GET method for shortlist agent using mocha 3', function (done) {
        var req = api.get('/Users/Me/Shortlist/Agents/')
            .set('Accept', 'application/json')
        // Set cookie to get saved user session
        req.cookies = Cookies;

        req.expect(200)
            .end(function (err, res) {
                //  this test should pass and test theme type
                expect(res.body.Results[0].Theme.ThemeType).to.include('Agent');
                console.log(res.body)
                done();
            });
    });

    it('GET method for shortlist agent using mocha 4', function (done) {
        var req = api.get('/Users/Me/Shortlist/Agents/')
            .set('Accept', 'application/json')
        // Set cookie to get saved user session
        req.cookies = Cookies;

        req.expect(200)
            .end(function (err, res) {

                //  this test should fail
                expect(res.body.Results[0].Mobile.length).to.equal(10);
                //expect(res.body.Total).to.equal(1);// passed
                console.log(res.body)
                done();
            });
    });

});