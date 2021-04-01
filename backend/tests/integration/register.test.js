const request = require('supertest');
const { User } = require('../../models/user');
const mongoose = require('mongoose');


describe('/register', () => {

    describe('POST /', () => {

        it('should return 200 if student register is successful', async ()=>{

            const server = require('../../index');
            const res = await request(server)
                        .post('/register')
                        .send({ 
                            name : "Michael Jackson",
                            username : "MJackson",
                            password :"abc123",
                            studentId : "1123456"
                        }); 

            expect(res.status).toBe(200);
            await User.remove({});
            await server.close(); 
        });


    });
});
