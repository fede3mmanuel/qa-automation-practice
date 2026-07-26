import { test, expect } from '@playwright/test';

test.describe('jsonplaceholder test api', () => {

    test('Confirm user 3 returns 200 and has an email', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users/3');
        expect(response.status()).toBe(200);

        const jsonResponse = await response.json();
        expect(jsonResponse.email).toBeDefined();

    });

    test('get 404 error for user 22', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users/22');
        expect(response.status()).toBe(404);
    });

    test('publish successful post request', async ({ request }) => {
        const publishPost = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: {
                title: 'Title of the post',
                body: 'body of the post',
                userId: 1 //Created by the first user
            }
        });
        expect(publishPost.status()).toBe(201);
    });

});