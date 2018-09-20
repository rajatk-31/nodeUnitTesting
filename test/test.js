let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);


describe('/User Register', () => {
    it('Should register a new User', (done) => {
        chai.request(server)
            .post('/register').send({
                'name': "Rajat Kumar",
                'email': "rajaf307@gmail.com",
                'password': "Qwerty@123"
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                done();
            })
    })
})



before('/User Login', () => {
    it('Should Login User', (done) => {
        chai.request(server)
            .post('/login').send({
                'email': "rajay307@gmail.com",
                'password': "Qwerty@123"
            })
            .end((err, res) => {
                const token = res.body.token
                res.should.have.status(200);
                res.body.should.have.property('success');
                res.body.success.should.equal(true)
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            })
    })
})