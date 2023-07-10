import mongoose from 'mongoose';
import request from 'supertest';
import { app, server } from '../server';
import { describe, expect, test } from '@jest/globals';
require('dotenv').config();

const dbstring = process.env.ATLAS_URI || '';

beforeAll(async () => {
  jest.setTimeout(60000);
  server.close();
  await mongoose.connection.close();
  await mongoose.connect(dbstring);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
  jest.setTimeout(3000);
});

//GetbyId Test
describe('Calling routes', () => {
  test('responds to /calling/:callingId', async () => {
    const result = {
      _id: '6497892b726a492433415e1a',
      organizationId: '649345be812b4a3f37335cf6',
      name: 'Bishop',
      __v: 0,
    };
    const res = await request(app).get('/calling/6497892b726a492433415e1a');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual(result);
  }, 20000);

  //Delete Test
  test('responds to /calling/:callingId', async () => {
    const res = await request(app).delete('/calling/64a9ee0d7498b5160bb418b0');
    expect(res.statusCode).toBe(200);
  }, 20000);

  // PUT Test
  test('responds to PUT /calling/:callingId', async () => {
    const update = {
      organizationId: '649345be812b4a3f37335cf6',
      name: 'First Calling',
    };

    const res = await request(app)
      .put('/calling/64a9e7ff9c9be0b893e4d197')
      .send(update);

    expect(res.statusCode).toBe(204);
  });

  // POST Test
  test('responds to POST /calling', async () => {
    const postInfo = {
      organizationId: '649345be812b4a3f37335cf6',
      name: 'New Calling',
    };

    const res = await request(app).post('/calling').send(postInfo);

    expect(res.statusCode).toBe(201);
  });
});
