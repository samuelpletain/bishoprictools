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

describe('Member routes', () => {
  let id = '';
  // GET by id test
  test('responds to /member/:memberId', async () => {
    const result = {
      _id: '6497233806e2f4b9a7f23f3e',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      password: '123456789',
      admin: true,
      ageGroup: 'Adult',
      wardId: '6493925960042c532a58a087',
      organizations: ['649345be812b4a3f37335cf6', '649345be812b4a3f37335cf8'],
      __v: 0,
    };
    const res = await request(app).get('/member/6497233806e2f4b9a7f23f3e');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual(result);
  }, 20000);

  // POST Test
  test('responds to POST /member', async () => {
    const postInfo = {
      firstName: 'Succesful',
      lastName: 'Test',
      email: 'Succesful@Test.com',
      password: '123456789',
      admin: false,
      ageGroup: 'Adult',
      wardId: '6493925960042c532a58a087',
      organizations: ['649345be812b4a3f37335cf6', '649345be812b4a3f37335cf8'],
    };

    const res = await request(app).post('/member').send(postInfo);
    expect(res.statusCode).toBe(201);

    const member = JSON.parse(res.text);
    id = member._id;
  });

  test('responds to GET /member', async () => {
    const res = await request(app).get('/member');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);

  // PUT Test
  test('responds to PUT /member/:memberId', async () => {
    const update = {
      firstName: 'Succesful',
      lastName: 'Test',
      email: 'Succesful1@Test.com',
      password: '123456789',
      admin: true,
      ageGroup: 'Adult',
      wardId: '6493925960042c532a58a087',
      organizations: ['649345be812b4a3f37335cf6', '649345be812b4a3f37335cf8'],
      __v: 0,
    };

    const res = await request(app).put(`/member/${id}`).send(update);
    expect(res.statusCode).toBe(204);
  });

  // DELETE test
  test('responds to /member/:memberId', async () => {
    const res = await request(app).delete(`/member/${id}`);
    expect(res.statusCode).toBe(200);
  }, 20000);

  test('responds to GET /member/stake/:stakeId', async () => {
    const res = await request(app).get(
      '/member/stake/64b763f9afc286d42818dcf7'
    );
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);

  test('responds to GET /member/ward/:wardId', async () => {
    const res = await request(app).get('/member/ward/6493925960042c532a58a087');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);
});
