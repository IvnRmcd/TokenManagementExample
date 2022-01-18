const app = require('./index')
const supertest = require("supertest");
const request = supertest(app);


//This test should fail 
it("Tests to see if Jest works ", () => {
    expect(1).toBe(1);
})

