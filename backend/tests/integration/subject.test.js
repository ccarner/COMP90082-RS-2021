const request = require('supertest');
const { User } = require('../../models/user');
const { Subject } = require('../../models/subject');
const mongoose = require('mongoose');


describe('/subject', () => {

    describe('POST /add', () => {

        it('should return 200 if add subject is successful', async () => {
            const server = require('../../index');

            const rootUser = new User({
                account: "admin2",
                password: "admin2",
                student_number: 1111111,
                is_moderator: true,
                is_admin: true
            });

            const token = rootUser.generateAuthToken();
            
            console.log(token);

            
            // const res = await request(server)
            //             .post('/subject/add')
            //             .set('x-auth-token', token)
            //             .send({
            //                 name : "SPM",
            //                 subject_code : "swen90016",
            //                 description : "fundamental course"
            //             });

            // expect(res.status).toBe(200);
            // await Subject.remove({});
            // await User.remove({});
            // await server.close(); 


        });


    });
});
