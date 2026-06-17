import { test, expect } from '@playwright/test';

test('Authenticated API Chaining: Amazon Retail Workflow', async ({ request }) => {
  // 1. AUTH & CREATE (POST)
  const auth = {
    username: process.env.API_USER!,
    password: process.env.API_PASSWORD!
  };

  const postRes = await request.post('/api/v1/cart', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${auth.username}:${auth.password}`).toString('base64')}`
    },
    data: { productId: 'iphone-17', quantity: 1 }
  });
  
  expect(postRes.status()).toBe(201);
  
  // PARSING: Extracting dynamic values from JSON response
  const body = await postRes.json();
  const token = body.access_token;     // Extracting Token
  const cartId = body.id;              // Extracting ID
  const instanceUrl = body.url_instance; // Extracting dynamic endpoint

  // 2. READ (GET) using the above captured Token and Instance URL
  const getRes = await request.get(`${instanceUrl}/cart/${cartId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  expect(getRes.ok()).toBeTruthy();

  // 3. UPDATE (PUT)- the quantity to 2
  await request.put(`${instanceUrl}/cart/${cartId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
    data: { quantity: 2 }
  });

  // 4. DELETE
  await request.delete(`${instanceUrl}/cart/${cartId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
});