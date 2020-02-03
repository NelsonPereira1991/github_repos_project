process.env.NODE_ENV = "test";
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from "../../app";
const should = chai.should();


chai.use(chaiHttp);

describe('GET /api/repos/:username tests', () => {
    it("it should give a 406 error when no 'accept' header is set", (done) => {
        chai.request(server)
            .get('/api/repos/NelsonPereira1991')
            .end((err, res) => {
                res.should.have.status(406);
                res.body.status.should.equal(406);
                res.body.message.should.equal("Invalid value for 'accept' header, cannot produce a response matching the list of acceptable values");
                done();
            });
    });

    it("it should give a 406 error when 'accept' header is set to application/xml", (done) => {
        chai.request(server)
            .get('/api/repos/NelsonPereira1991')
            .set('accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(406);
                res.body.status.should.equal(406);
                res.body.message.should.equal("Invalid value for 'accept' header, cannot produce a response matching the list of acceptable values");
                done();
            });
    });

    it("it should give a 404 error the user in the request is not a valid github user", (done) => {
        chai.request(server)
            .get('/api/repos/NelsonPereira1991erororhere')
            .set('accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.status.should.equal(404);
                res.body.message.should.equal("Could not find User");
                done();
            });
    });

    //TODO NELSON the test bellow will fail when I create new repositories
    it("it should give a list of the users repositories if the user is a valid and the header is correctly set", (done) => {
        chai.request(server)
            .get('/api/repos/NelsonPereira1991')
            .set('accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.equal(200);
                res.body.message.should.equal("LALALA Repositories successfully retrieved :)");
                res.body.data.nextLink.should.contain("?page=2");
                res.body.data.repositories.length.should.equal(7);
                res.body.data.repositories[0].name.should.equal("AGRS_projets");
                res.body.data.repositories[0].owner_login.should.equal("NelsonPereira1991");
                res.body.data.repositories[0].branches.length.should.equal(1);
                res.body.data.repositories[0].branches[0].name.should.equal("master");
                res.body.data.repositories[0].branches[0].last_commit_sha.should.equal("b34e1c8892d71371edca38ec55dfda5c683a5889");
                done();
            });
    });

    it("it should return an empty array if page=2 is passed as a param, as this user does not have enough repos for two pages", (done) => {
        chai.request(server)
            .get('/api/repos/NelsonPereira1991?page=2')
            .set('accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(204);
                should.not.exist(res.body.data);
                done();
            });
    });
});