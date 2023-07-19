import mongoose from 'mongoose';
import request from 'supertest';
import { app, server } from '../server';
import { describe, expect, test } from '@jest/globals';
require('dotenv').config();

const dbstring = process.env.ATLAS_URI || '';

beforeAll(async () => {
  jest.setTimeout(60000);
  await server.close();
  await mongoose.connection.close();
  await mongoose.connect(dbstring);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
  jest.setTimeout(3000);
});

//GetbyId Test
describe('Calling routes', () => {
  test('responds to GET /', async () => {
    const res = await request(app).get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);

  test('responds to GET /api-docs', async () => {
    const res = await request(app).get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);
});
