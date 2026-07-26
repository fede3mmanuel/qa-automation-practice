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

});