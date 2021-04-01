const request = require('supertest');
const { User } = require('../../models/user');
const { Subject } = require('../../models/subject');
const mongoose = require('mongoose');


describe('/subject', () => {

    describe('POST /add', () => {

        it('should return 200 if add subject is successful', async () => {
            const server = require('../../index');

            const token = new User({ is_moderator: true,is_admin: true }).generateAuthToken();

            const res = await request(server)
                        .post('/subject/add')
                        .set('auth-token', token)
                        .send({
                            name : "SPM",
                            subject_code : "swen90016",
                            description : "fundamental course"
                        });

           
            expect(res.status).toBe(200);
            await Subject.remove({});
            await User.remove({});
            await server.close(); 
        });

        it('should return 400 if the subject has been existed', async () => {
            const server = require('../../index');

            const token = new User({ is_moderator: true,is_admin: true }).generateAuthToken();

            await request(server)
            .post('/subject/add')
            .set('auth-token', token)
            .send({
                name : "SPM",
                subject_code : "swen90016",
                description : "fundamental course"
            });

            const res = await request(server)
                        .post('/subject/add')
                        .set('auth-token', token)
                        .send({
                            name : "SPM",
                            subject_code : "swen90016",
                            description : "fundamental course"
                        });

           
            expect(res.status).toBe(400);
            await Subject.remove({});
            await User.remove({});
            await server.close(); 
        });

    });
});
