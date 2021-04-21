const request = require('supertest');
const { User } = require('../../models/user');
const { Subject } = require('../../models/subject');
const generator = require('generate-password');
let server;

describe('/subject', () => {
    beforeEach(async ()=>{
        server = require('../../index');
        await User.deleteMany({});
        await Subject.deleteMany({});
    })

    describe('POST /add', () => {
        it('should return 200 if add subject is successful', async () => {
            let moderator = new User({
                account: 'moderator',
                password: generator.generate(),
                is_moderator: true
            });

            const token = moderator.generateAuthToken();
            await moderator.save();
            const res = await request(server)
                        .post('/subject/add')
                        .set('auth-token', token)
                        .send({
                            name : "SPM",
                            subject_code : "swen90016",
                            description : "fundamental course"
                        });

            moderator = await User.findOne({account: 'moderator'});

            expect(res.status).toBe(200);
            expect(moderator).toHaveProperty('moderated_subjects')
            await Subject.deleteMany({});
            await User.deleteMany({});
            await server.close(); 
        });

        it('should return 400 if the subject has been existed', async () => {
            let moderator = new User({
                account: 'moderator',
                password: generator.generate(),
                is_moderator: true
            });

            const token = moderator.generateAuthToken();
            await moderator.save();

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
            expect(moderator).toHaveProperty('moderated_subjects')
            await Subject.deleteMany({});
            await User.deleteMany({});
            await server.close(); 
        });
    });
});
