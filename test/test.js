let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);


// describe('/User Register', () => {
//     it('Should register a new User', (done) => {
//         chai.request(server)
//             .post('/register').send({
//                 'name': "Rajat Kumar",
//                 'email': "rajay307@gmail.com",
//                 'password': "Qwerty@123"
//             })
//             .end((err, res) => {
//                 res.should.have.status(201);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('success');
//                 done();
//             })
//     })
// })

describe('/User Login', () => {
    it('Should Login User', (done) => {
        chai.request(server)
            .post('/login').send({
                'email': "rajay307@gmail.com",
                'password': "Qwerty@123"
            })
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            })
    })
})