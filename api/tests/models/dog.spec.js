const { Doggies, Temperaments, conn } = require("../../src/db")
const { expect } = require('chai');

describe('Model Testing', function() {
 
  describe('Dog model', function () {
    beforeEach(async function() {
      await Doggies.sync({ force: true });
    });
    describe('Validations', function () {
      it('No deberia crearse sin los datos completos', function(done) {
         Doggies.create({
          name: 'Rofo',
         })
          .then(() => done('No debería haberse creado'))
          .catch(() => done());
      });
      it('No deberia crearse sin los datos completos', function(done) {
        Doggies.create({
          height: 'ARG',
        })
        .then(() => done('No deberia haberse creado'))
        .catch(() => done());
      });
    });
  })
  describe('Temperament model', function () {
    beforeEach(async function() {
      await Temperaments.sync({ force: true });
    });
        it('No deberia crearse sin los datos completos', function(done) {
        Temperaments.create({
          id: '11',
        })
        .then(() => done('No deberia haberse creado'))
        .catch(() => done());
      });
      it('Name deberia ser un string', function(){
        expect(typeof Temperaments.name).equal("string")
      })
    });
})
