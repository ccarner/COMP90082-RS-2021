const request = require('supertest');
const { User } = require('../../models/user');
const mongoose = require('mongoose');


describe('/login', () => {

    describe('POST /', () => {

        it('should return 200 if token is valid', async ()=>{

            const server = require('../../index');
            const res = await request(server)
                        .post('/login')
                        .send({ account : "abc", password : "abc" }); 

            expect(res.status).toBe(200);
            await User.remove({});
            await server.close(); 
        });
    });
});
