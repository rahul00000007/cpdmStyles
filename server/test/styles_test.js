const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();
const expect = chai.expect;

chai.use(require("chai-json-schema"));
chai.use(chaiHttp);
///get all styles
describe("/GET all Styles:", () => {
  it("it expect to GET all the Styles", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message.should.be.eql("All styles data"));
        done();
      });
  });
});
//get Styles by styleName
describe("/GET Styles by Style Name:", () => {
  var styleName = "Iterative";
  it("it expect to GET all the Styles", (done) => {
    chai
      .request(app)
      .get("/style/" + styleName)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message.should.be.eql("styles found"));
        done();
      });
  });
});

//post an style
describe("/POST New Style", () => {
  it("Adding new style", (done) => {
    let style = {
      styleName: "Continuous",
      styleOrder: 5,
    };
    chai
      .request(app)
      .post("/newStyle")
      .send(style)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        done();
      });
  });
});
