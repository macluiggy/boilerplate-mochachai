// en los comentarios $1, $2, $3, $4, etc. quiere decir 'n argumento': primer argumento, segundo argumento, etc.

const chai = require("chai");
const assert = chai.assert;

const server = require("../index");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

require("dotenv").config();

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      // evalua que el contenido de la url en el methodo de request satsfaga los asserts
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      // lo mismo que el de arriba, en esta caso se usan queries
      chai
        .request(server)
        .get("/hello?name=xy_z") //supongo que esto pasa de text?var1=text1&var2=text2 a text text1 text2, no ya verifique y el resultado depende de el codigo dentro de esa ruta
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });
    // ('hh "hh" ffj');
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({
          surname: "Colombo",
        })
        .end(function (err, res) {
          // const {
          //   status,
          //   type,
          //   body: { name, surname },
          // } = res;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Cristoforo");
          assert.equal(res.body.surname, "Colombo");

          done();
        });
    });
    // // #3.1
    // test('Send {surname: "Polo"}', function (done) {
    //   chai
    //     .request(server)
    //     .put("/travellers")
    //     .send({
    //       surname: "Polo",
    //     })
    //     .end(function (err, res) {
    //       const {
    //         status,
    //         type,
    //         body: { name, surname },
    //       } = res;
    //       assert.equal(status, 200);
    //       assert.equal(type, "application/json");
    //       assert.equal(name, "Marco");
    //       assert.equal(surname, "Polo");

    //       done();
    //     });
    // });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({
          surname: "da Verrazzano",
        })
        .end((err, res) => {
          // const {
          //   status,
          //   type,
          //   body: { name, surname },
          // } = res;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Giovanni");
          assert.equal(res.body.surname, "da Verrazzano");
          done();
        });
    });
  });
});

const Browser = require("zombie");
Browser.site = process.env.SITE_URL; //establece el sitio que se va a usar para testear su comportamiento

suite("Functional Tests with Zombie.js", function () {
  this.timeout(5000);
  const browser = new Browser();
  suiteSetup(function (done) {
    return browser.visit("/", done);
  });
  suite("Headless browser", function () {
    test('should have a working "site" property', function () {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      // assert.fail(); //si no se commentaba esta parte el test fallaria sin si quiera probar lo que sigue abajo
      browser.fill("surname", "Colombo").then(() => {
        // llena el input con name=surname con "Colombo"
        browser.pressButton("submit", () => {
          //luego presiona el boton submit
          browser.assert.success(); //verifica que el status es 200
          browser.assert.text("span#name", "Cristoforo"); // evalua que el texto dentro del elemento del $1 sea $2
          browser.assert.text("span#surname", "Colombo"); // testea que el texto dentro del elemento del $1 sea $2
          browser.assert.elements("span#dates", 1); // verifica que los elementos del elemento del $1 haya $2 cantidad de los mismos
        });
        done();
      });
      // done(); // done puede ir aqui o allad
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      // assert.fail();ff
      browser.fill("surname", "Vespucci").then(() => {
        browser.pressButton("submit", () => {
          browser.assert.success();
          browser.assert.text("span#name", "Amerigo");
          browser.assert.text("span#surname", "Vespucci");
          browser.assert.elements("span#dates", 1);
        });
      });

      done();
    });
  });
});
