import babel_polyfill from 'babel-polyfill';
import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const user = {
  firstname: 'Dannni',
  lastname: 'dowtun',
  othernames: 'ram',
  email: faker.internet.email(),
  phonenumber: '09282828282828',
  password: '12345678',
  username: faker.internet.userName(),
  password2: '12345678',
  registered: faker.date.recent(),
  isadmin: false
};

const admin = {
  firstname: 'Danielly',
  lastname: 'messi',
  othernames: 'cow',
  email: faker.internet.email(),
  phonenumber: '0905298944386',
  password: '123456785r',
  password2: '123456785r',
  username: faker.internet.userName(),
  registered: faker.date.recent(),
  isadmin: true
};

let token;
let adminToken;

// authentication routes tests
describe('POST api/v1/auth/signup', () => {
  it('should successfully create a user account if inputs are valid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        token = body.data[0].token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should successfully create an admin account if inputs are valid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(admin)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        adminToken = body.data[0].token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should return an error if signup inputs are invalid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should return an error if username or email already exists', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'dandare47',
        email: 'danny11111@gmail.com',
        firstname: faker.name.firstName(),
        othernames: faker.name.firstName(),
        lastname: faker.name.lastName(),
        registered: faker.date.recent(),
        phonenumber: '21334314543',
        password: '3qwdvf34wedscerscd',
        password2: '3qwdvf34wedscerscd',
        isadmin: false
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.a('string');
        expect(body.errors).to.equals('User already exist');
        done();
      });
  });
});

describe('POST api/v1/auth/signup', () => {
  it('should return an error if passwords do not match', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'dandare477',
        email: 'danny111111@gmail.com',
        firstname: faker.name.firstName(),
        othernames: faker.name.firstName(),
        lastname: faker.name.lastName(),
        registered: faker.date.recent(),
        phonenumber: '21334314543',
        password: '3qwdvf34wedscerscd',
        password2: '3qwdvf34wedscer',
        isadmin: false
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.a('object');
        expect(body.errors.password2).to.equals('Passwords must match');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should successfully log a user in if login inputs are valid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should return an error if login inputs are invalid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password()
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.a('object');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should return an error if login inputs are empty', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.a('object');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('should return an error if login password is wrong', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        username: user.username,
        password: '1fiuvjnmwcijnmk3wdc0'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors.email).to.be.a('string');
        done();
      });
  });
});

// redflag
describe('POST api/v1/red-flags', () => {
  it('should create a record if user input is valid', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags/')
      .set({ 'x-access-token': token })
      .send({
        title: 'Hello frorm here',
        status: 'resolved',
        location: `${faker.address.longitude()}, ${faker.address.latitude()}`,
        comments: `${faker.random.words()} ${faker.random.words()}`,
        type: 'red-flag',
        videos: 'jello.mp4',
        images: 'down.jpg'
      })
      .end((err, res) => {
        console.log(res.body);
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        // expect(body).to.haveOwnProperty('data');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.be.an('object');
        expect(body.data[0].message).to.be.a('string');
        expect(body.data[0]).to.haveOwnProperty('id' && 'message');
        expect(body.data[0].message).to.be.equals('Created red-flag record');
        done();
      });
  });
});

describe('POST api/v1/red-flags', () => {
  it('should return an unauthorized error if there is no header token', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags/')
      .send({
        title: 'Hello frorm here',
        status: 'resolved',
        location: `${faker.address.longitude()}, ${faker.address.latitude()}`,
        comments: `${faker.random.words()} ${faker.random.words()}`,
        type: 'red-flag',
        videos: 'jello.mp4',
        images: 'down.jpg'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('errors');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(403);
        expect(body.errors).to.be.equals('Unauthorized!, you have to login first');
        done();
      });
  });
});

describe('POST api/v1/red-flags', () => {
  it('should return an unauthorized error if there is an invalid jwt token', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags/')
      .set('x-access-token', '34wedcijnemwfecdokjin3jfwekmdcpjirefkmdcls')
      .send({
        title: 'Hello frorm here',
        status: 'resolved',
        location: `${faker.address.longitude()}, ${faker.address.latitude()}`,
        comments: `${faker.random.words()} ${faker.random.words()}`,
        type: 'red-flag',
        videos: 'jello.mp4',
        images: 'down.jpg'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body.error).to.be.a('object');
        expect(body.error.message).to.be.equals('jwt malformed');
        expect(body.error.message).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/red-flags', () => {
  it('should return an error if user input is invalid', done => {
    chai
      .request(app)
      .post('/api/v1/red-flags/')
      .set({ 'x-access-token': token })
      .send({
        location: undefined,
        comments: undefined,
        type: undefined
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.errors).to.be.a('object');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        done();
      });
  });
});

describe('GET api/v1/red-flags', () => {
  it('should return all available red-flag records', done => {
    chai
      .request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('id');
        done();
      });
  });
});

describe('GET api/v1/red-flags/:id', () => {
  it('should return a red-flag record with a specific id', done => {
    chai
      .request(app)
      .get('/api/v1/red-flags/25')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('status' && 'data');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('id' && 'comments' && 'location' && 'type');
        done();
      });
  });
});

describe('GET api/v1/red-flags/:id (id is non-existent)', () => {
  it('should return an error if a user attempts to make a request for an unexistent record id', done => {
    chai
      .request(app)
      .get(`/api/v1/red-flags/${faker.random.number() + faker.random.number()}`)
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.haveOwnProperty('errors');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body.errors).to.be.equal('red-flag record not found');
        done();
      });
  });
});

describe('PATCH api/v1/red-flags/:id/location', () => {
  it('should return an error if the record of that id is non-existent', done => {
    chai
      .request(app)
      .patch('/api/v1/red-flags/322349/location')
      .set({ 'x-access-token': token })
      .send({
        location: '543.3213, 423.242'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.equal('red-flag record not found');
        done();
      });
  });
});

describe('PATCH api/v1/red-flags/:id/location', () => {
  it('should return an error if the record was not created by the user', done => {
    chai
      .request(app)
      .patch('/api/v1/red-flags/322343/location')
      .set({ 'x-access-token': token })
      .send({
        location: '543.3213, 423.242'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('errors');
        done();
      });
  });
});

describe('PATCH api/v1/red-flags/:id/location', () => {
  it('should return an error if the location field is empty', done => {
    chai
      .request(app)
      .patch('/api/v1/red-flags/19/location')
      .set({ 'x-access-token': token })
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        done();
      });
  });
});

describe('PATCH api/v1/red-flags/:id/comment', () => {
  it('edit the comment value of a record if it exists ', done => {
    chai
      .request(app)
      .patch('/api/v1/red-flags/19/comment')
      .set({ 'x-access-token': token })
      .send({
        comments: faker.random.words()
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(403);
        expect(body.errors).to.be.a('string');
        done();
      });
  });
});

describe('PATCH api/v1/red-flags/:id/comment', () => {
  it('should return an error if the id is not existing', done => {
    chai
      .request(app)
      .patch('/api/v1/red-flags/543254/comment')
      .set({ 'x-access-token': token })
      .send({
        comments: faker.random.words()
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.equal('red-flag record not found');
        done();
      });
  });
});

describe('PATCH api/v1/red-flag/:id/status', () => {
  it('should return a 403 error if the user is not an admin', done => {
    chai
      .request(app)
      .patch('/api/v1/red-flags/1/status')
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(403);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.equals('Unauthorized!!!. Only an admin can perform this operation');
        done();
      });
  });
});

describe('PATCH api/v1/red-flag/:id/status', () => {
  it('should return a 404 error if the record to update does not exist', done => {
    chai
      .request(app)
      .patch('/api/v1/red-flags/5432345/status')
      .set({ 'x-access-token': adminToken })
      .send({
        status: 'resolved'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.equals('red-flag record not found with given ID');
        done();
      });
  });
});

describe('PATCH api/v1/red-flags/:id/comment', () => {
  it('should return an error if the comment field is empty', done => {
    chai
      .request(app)
      .patch('/api/v1/red-flags/20/comment')
      .set({ 'x-access-token': token })
      .send({})
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        done();
      });
  });
});

// INTER
describe('PATCH api/v1/intervention/:id/comment', () => {
  it('should return an error if the comment field is empty', done => {
    chai
      .request(app)
      .patch('/api/v1/interventions/35/comment')
      .set({ 'x-access-token': token })
      .send({})
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/status', () => {
  it('should successfully change the status of a record is the user is an admin', done => {
    chai
      .request(app)
      .patch('/api/v1/interventions/35/status')
      .set({ 'x-access-token': adminToken })
      .send({
        status: 'resolved'
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        console.log(body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data[0].message).to.equals('Updated intervention record’s status');
        done();
      });
  });
});

describe('PATCH api/v1/intervention/:id/location', () => {
  it('should return an error if the location field is empty', done => {
    chai
      .request(app)
      .patch('/api/v1/interventions/35/location')
      .set({ 'x-access-token': token })
      .send()
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        done();
      });
  });
});
