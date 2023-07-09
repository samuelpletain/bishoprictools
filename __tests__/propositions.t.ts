import mongoose from 'mongoose';
import request from 'supertest';
import {app, server} from '../server';
import { describe, expect, test } from '@jest/globals';
import router from '../routes/propositions'
require('dotenv').config();

const dbstring = process.env.ATLAS_URI || '';

beforeAll(async () => {
  server.close()
  await mongoose.connection.close();
  await mongoose.connect(dbstring)
})

afterAll( async () => {
  await mongoose.connection.close();
  server.close()
  jest.setTimeout(3000);
});

describe('Ward routes', () => {
  const newProposition = {
    memberId: "6493930c60042c532a58a08b",
    callingId: "6493923060042c532a58a084",
    leaderApproval: true,
    contactedOn: "2022-08-13",
    interviewDate: "2022-08-15",
    interviewed: true,
    accepted: true,
    sustainedOn: "2022-08-17",
    setApart: "2022-08-17",
    realeasedOn: "2023-01-01"
  };
  let id = '';
  const updatedProposition = {
    memberId: "6493930c60042c532a58a08b",
    callingId: "6493923060042c532a58a084",
    leaderApproval: true,
    contactedOn: "2022-08-13",
    interviewDate: "2022-08-15",
    interviewed: true,
    accepted: true,
    sustainedOn: "2023-08-17",
    setApart: "2023-08-17",
    realeasedOn: "2024-01-01"
  };

  test('responds to POST /proposition', async () => {
    const res = await request(app).post('/proposition').send(newProposition);
    const proposition = JSON.parse(res.text);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    id = proposition._id;
  }, 20000);

  test('responds to GET /proposition/:propositionId', async () => {
    const error = await request(app).get(`/proposition/123`);
    expect(error.header['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(error.statusCode).toBe(400);
    expect(JSON.parse(error.text)).toEqual('Please provide a valid proposition id.');
    const res = await request(app).get(`/proposition/${id}`);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);

  test('responds to PUT /proposition/:propositionId', async () => {
    const error = await request(app).get(`/proposition/123`);
    expect(error.header['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(error.statusCode).toBe(400);
    expect(JSON.parse(error.text)).toEqual('Please provide a valid proposition id.');
    const res = await request(app).put(`/proposition/${id}`).send(updatedProposition);
    expect(res.statusCode).toBe(204);
  }, 20000);

  test('responds to GET /proposition', async () => {
    const res = await request(app).get('/proposition');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);

  test('responds to DELETE /proposition/:propositionId', async () => {
    const error = await request(app).get(`/proposition/123`);
    expect(error.header['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(error.statusCode).toBe(400);
    const res = await request(app).delete(`/proposition/${id}`);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);
});
