import { test, expect } from '@playwright/test';

test.describe('reqres api', () => {

    test('Get user 3 returs 200 and has an email', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users/2');
        expect(response.status()).toBe(200);

        const jsonResponse = await response.json();
        expect(jsonResponse.email).toBeDefined();

    })

})