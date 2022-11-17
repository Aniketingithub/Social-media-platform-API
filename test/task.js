let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')

chai.should()
chai.use(chaiHttp)

describe('Tasks API', () => {
   describe('POST /api/authenticate/register', () => {
      const object = {
         name: "Aniket",
         email: "freak1529@gmail.com",
         password: "000000"
      }
      it("It registers the user", (done) => {
         chai.request(server)
            .post("/api/authenticate/register")
            .send(object)
            .end((err, res) => {
               res.should.have.status(200);
               done();
            });
      })
   })

   describe('POST /api/authenticate/', () => {
      const object = {
         email: "freak1529@gmail.com",
         password: "000000"
      }
      it('it authenticates the user and return the JWT token', (done) => {
         chai.request(server)
            .post('/api/authenticate')
            .send(object)
            .end((err, res) => {
               res.should.have.status(200)
               done();
            })
      })
   })

   // Return data of users
   describe('GET /api/user', () => {
      it("it returns the data of authenticated user", (done) => {
         chai.request(server)
            .get('/api/user')
            .end((err, res) => {
               // res.should.have.status(200)
               res.body.should.be.a('object')
               done()
            })
      })
   })
})