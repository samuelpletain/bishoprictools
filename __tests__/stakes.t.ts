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
  jest.setTimeout(60000);
});

describe('stake routes', () => {
  const newstake = {
    name: 'Midvale 2nd',
  };
  let id = '';
  const newName = 'Midvale 3rd';

  test('responds to POST /stake', async () => {
    const res = await request(app).post('/stake').send(newstake);
    const stake = JSON.parse(res.text);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    expect(stake.name).toEqual(newstake.name);
    id = stake._id;
  }, 20000);

  test('responds to GET /stake/:stakeId', async () => {
    const error = await request(app).get(`/stake/123`);
    expect(error.header['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(error.statusCode).toBe(400);
    expect(JSON.parse(error.text)).toEqual('Please provide a valid stake id.');
    const res = await request(app).get(`/stake/${id}`);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual({
      name: newstake.name,
      _id: id,
      __v: 0,
    });
  }, 20000);

  test('responds to PUT /stake/:stakeId', async () => {
    const error = await request(app).get(`/stake/123`);
    expect(error.header['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(error.statusCode).toBe(400);
    expect(JSON.parse(error.text)).toEqual('Please provide a valid stake id.');
    const res = await request(app).put(`/stake/${id}`).send({
      name: newName,
    });
    expect(res.statusCode).toBe(204);
  }, 20000);

  test('responds to GET /stake', async () => {
    const res = await request(app).get('/stake');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual(
      expect.arrayContaining([
        {
          name: newName,
          _id: id,
          __v: 0,
        },
      ])
    );
  }, 20000);

  test('responds to DELETE /stake/:stakeId', async () => {
    const error = await request(app).get(`/stake/123`);
    expect(error.header['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(error.statusCode).toBe(400);
    const res = await request(app).delete(`/stake/${id}`);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);
});
