/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai")
const session = require("supertest-session")
const app = require("../../src/app")
const { Doggies, Temperaments, conn } = require("../../src/db")

const agent = session(app)

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Can't reach DB", err)
    })
  )

describe('/dogs', function() {
  it('GET responde con un status 200', function(){
    return agent
      .get('/dogs')
      .expect(function(res){
        expect(res.status).equal(200)})
  }).timeout(10000)
  it('Los elementos que recibe GET son de tipo objeto',  function() {
    return agent 
      .get('/dogs') 
      .expect(function(res) {
        expect(typeof res.body[0]).equal('object'); 
      });
  }).timeout(10000)
})
describe('/dogs?name=', function() {
  it('GET responde con status 200 si encuentra un perro', function() {
    return agent 
      .get('/dogs?name=ARG') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
      }).timeout(10000)
  it('GET recibe los datos de mas de un perro si hay coincidencia',  function() {
    return agent 
      .get('/dogs?name=Hound') 
      .expect(function(res) {
        expect(res.body.length).equal(3); 
      });
  }).timeout(10000)
})
describe('/dogs/:id', function() {
  it('GET responde con status 200 si encuentra un perro',  function() {
    return agent 
      .get('/dogs/1') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
      }).timeout(10000);
  it('GET recibe los datos de un perro por ID',  function() {
    return agent 
      .get('/dogs/1')
      .expect(function(res) {
        expect(res.body.name).equal("Affenpinscher"); 
      });
  }).timeout(10000)
})
describe('/temperaments', function() {
  it('GET responde con status 200 si encuentra los temperamentos', function() {
    return agent 
      .get('/temperament') 
      .expect(function(res){
        expect(res.status).equal(200)}); 
      }).timeout(10000);
  it('GET recibe los temperamentos y su id',  function() {
    return agent 
      .get('/temperament')
      .expect(function(res) {
        expect(res.body[0].id).equal(1)
        expect(res.body[0].name).equal("Active")
      });
  }).timeout(10000)
})
});
