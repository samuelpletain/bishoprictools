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

describe('Ward routes', () => {
  const newWard = {
    name: 'Midvale 2nd',
    stakeId: '64b763f9afc286d42818dcf7',
  };
  let id = '';
  const newName = 'Midvale 3rd';

  test('responds to POST /ward', async () => {
    const res = await request(app).post('/ward').send(newWard);
    const ward = JSON.parse(res.text);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
    expect(ward.name).toEqual(newWard.name);
    id = ward._id;
  }, 20000);

  test('responds to GET /ward/:wardId', async () => {
    const error = await request(app).get(`/ward/123`);
    expect(error.header['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(error.statusCode).toBe(400);
    expect(JSON.parse(error.text)).toEqual('Please provide a valid ward id.');
    const res = await request(app).get(`/ward/${id}`);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual({
      name: newWard.name,
      stakeId: newWard.stakeId,
      _id: id,
      __v: 0,
    });
  }, 20000);

  test('responds to PUT /ward/:wardId', async () => {
    const error = await request(app).get(`/ward/123`);
    expect(error.header['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(error.statusCode).toBe(400);
    expect(JSON.parse(error.text)).toEqual('Please provide a valid ward id.');
    const res = await request(app).put(`/ward/${id}`).send({
      name: newName,
      stakeId: '64b763f9afc286d42818dcf7',
    });
    expect(res.statusCode).toBe(204);
  }, 20000);

  test('responds to GET /ward', async () => {
    const res = await request(app).get('/ward');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual(
      expect.arrayContaining([
        {
          name: newName,
          stakeId: newWard.stakeId,
          _id: id,
          __v: 0,
        },
      ])
    );
  }, 20000);

  test('responds to DELETE /ward/:wardId', async () => {
    const error = await request(app).get(`/ward/123`);
    expect(error.header['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(error.statusCode).toBe(400);
    const res = await request(app).delete(`/ward/${id}`);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  }, 20000);
});
