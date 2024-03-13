import { SiteUser } from '../dist/models/siteUser';
import { Question } from '../dist/models/question';

describe('create siteUser', function () {
    test('created siteUser', async function () {
        await SiteUser.create({
            username: 'test123',
            password: 'test123',
            email: 'test123@test.com',
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
