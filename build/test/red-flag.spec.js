"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

var expect = _chai.default.expect;
describe('POST red-flags requests', function () {
  it('should add a new red flag record if details are correct', function (done) {
    _chai.default.request(_app.default).post('/api/v1/red-flags').send({
      id: 14,
      createdOn: new Date().toLocaleString(),
      createdBy: 99,
      title: 'Bribery case',
      type: 'red-flag',
      latitude: '6.5977139',
      longitude: '3.3329975',
      status: 'under-investigation',
      comments: 'Bribery case story Bribery case story '
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
      done(err);
    });
  });
  it('should return an error if no input is supplied', function (done) {
    _chai.default.request(_app.default).post('/api/v1/red-flags').send({}).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('errors');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(400);
      done(err);
    });
  });
  it('should return an error if location is empty', function (done) {
    _chai.default.request(_app.default).post('/api/v1/red-flags').send({
      id: 5,
      createdOn: new Date().toLocaleString(),
      createdBy: 90,
      title: 'Bribery case',
      type: 'red-flag',
      location: '',
      status: 'under-investigation',
      comments: 'Bribery case story'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('errors');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(400);
      done(err);
    });
  });
  it('should return an error if comment input is less than 25 characters', function (done) {
    _chai.default.request(_app.default).post('/api/v1/red-flags').send({
      id: 11,
      createdOn: new Date().toLocaleString(),
      createdBy: 100,
      title: 'Fraud case',
      type: 'red-flag',
      location: '6.5977139, 3.3329975',
      status: 'under-investigation',
      images: [],
      videos: [],
      comments: 'tddd'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('errors');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(400);
      done(err);
    });
  });
});
describe('GET red-flag requests', function () {
  it('should retrieve the list of all the red-flags', function (done) {
    _chai.default.request(_app.default).get('/api/v1/red-flags').end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
      done(err);
    });
  });
  it('should retrieve the specific red-flag with given id', function (done) {
    _chai.default.request(_app.default).get('/api/v1/red-flags/10').end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
      done(err);
    });
  });
  it('should return an error if red-flag does not exist', function (done) {
    _chai.default.request(_app.default).get('/api/v1/red-flags/t').end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('errors');
      expect(res.body.status).to.equal(404);
      done(err);
    });
  });
});
describe('PATCH red-flag requests', function () {
  it('should update the location of the red flag resource with the given id', function (done) {
    _chai.default.request(_app.default).patch("/api/v1/red-flags/10/location").send({
      latitude: '6.5922139',
      longitude: '3.3427375'
    }).end(function (err, res) {
      expect(res).to.has.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data[0].id).to.be.equal('10');
      done(err);
    });
  });
  it('should return an error if the id of the red flag resource does not exist', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/red-flags/20/location').send({
      latitude: '6.4922139',
      longitude: '3.6427375'
    }).end(function (err, res) {
      expect(res).to.has.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.equal(404);
      done(err);
    });
  });
  it('should return an error if the request body is empty', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/red-flags/10/location').send({}).end(function (err, res) {
      expect(res).to.has.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.equal(400);
      done(err);
    });
  });
  it('should return an error if the longitude of the red flag resource is empty', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/red-flags/10/location').send({
      latitude: '6.5922459',
      longitude: ''
    }).end(function (err, res) {
      expect(res).to.has.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.equal(400);
      done(err);
    });
  });
  it('should return an error if the longitude of the red flag resource is invalid', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/red-flags/10/location').send({
      latitude: '6.5922139',
      longitude: 'gt6wgw'
    }).end(function (err, res) {
      expect(res).to.has.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.equal(400);
      done(err);
    });
  });
  it('should return an error if the latitude of the red flag resource is empty', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/red-flags/10/location').send({
      latitude: '',
      longitude: '3.3427375'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('errors');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(400);
      done(err);
    });
  });
  it('should return an error if the latitude of the red flag resource is invalid', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/red-flags/10/location').send({
      latitide: 'gushs',
      longitude: '3.3427375'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('errors');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(400);
      done(err);
    });
  });
  it('should update the comment of the red flag resource with the given id', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/red-flags/10/comment').send({
      comments: 'Bribery and dshdthdg extortion by the NPF'
    }).end(function (err, res) {
      expect(res).to.has.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data[0].id).to.be.equal('10');
      done(err);
    });
  });
  it('should return an error if the comment of the red flag resource is empty', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/red-flags/10/comment').send({
      comment: ''
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('errors');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(400);
      done(err);
    });
  });
  it('should return an error if comment is less than 25 characters', function (done) {
    _chai.default.request(_app.default).post('/api/v1/red-flags').send({
      type: 'red-flag',
      latitude: '6.5951139',
      longitude: '3.3429975',
      comment: 'A short comment'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('errors');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(400);
      done(err);
    });
  });
});