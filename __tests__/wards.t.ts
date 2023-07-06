import request from 'supertest';
import app from '../server';
import router from '../routes/wards';
import { describe, expect, test } from '@jest/globals';

app.use('/', router);

describe('Ward routes', () => {
  test('responds to /ward/:wardId', async () => {
    const result = {
      _id: "6493925960042c532a58a087",
      name: "Midvale 11th"
    }
    const res = await request(app).get('/ward/6493925960042c532a58a087');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual(result);
  }, 20000);
});