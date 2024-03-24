import { SiteUser } from '../dist/models/siteUser';
import { Question } from '../dist/models/question';
import bcrypt from 'bcrypt';

describe('create siteUser', function () {
    test('created siteUser', async function () {
        bcrypt.hash('test123', 10, async function (error, hash) {
            await SiteUser.create({
                username: 'test123',
                password: hash,
                email: 'test123@test.com',
            });
        });
    });
});

describe('create question', function () {
    test('created question', async function () {
        for (let i = 1; i <= 100; i++) {
            await Question.create({
                subject: `question ${i}`,
                content: `question ${i}`,
                author_id: 1,
            });
        }
    });
});
