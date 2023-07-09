import request from 'supertest';
import app from '../server';
import router from '../routes/members';
import { describe, expect, test } from '@jest/globals';

app.use('/', router);

describe('Member routes', () => {
  test('responds to /member/:memberId', async () => {
    const result = {
      _id: "6497233806e2f4b9a7f23f3e",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      password: "123456789",
      admin: true,
      ageGroup: "Adult",
      wardId: "6493925960042c532a58a087",
      organizations: ["649345be812b4a3f37335cf6", "649345be812b4a3f37335cf8"],
      __v: 0
    };
    const res = await request(app).get('/member/6497233806e2f4b9a7f23f3e');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual(result);
  }, 20000);

  // Delete Test
  describe('Member routes', () => {
    test('responds to /member/:membergId', async () => {
      const res = await request(app).delete('/member/64aa1183f52fb4d632616e6c');
      expect(res.statusCode).toBe(200);
    }, 20000);

    // PUT Test
    test('responds to PUT /member/:memberId', async () => {
      const update = {
        _id: "64aa12210644bc8107c1fa17",
        firstName: "Succesful",
        lastName: "Test",
        email: "Test@Test.com",
        password: "123456789",
        admin: true,
        ageGroup: "Adult",
        wardId: "6493925960042c532a58a087",
        organizations: ["649345be812b4a3f37335cf6", "649345be812b4a3f37335cf8"],
        __v: 0
      };

      const res = await request(app)
        .put('/member/64aa1183f52fb4d632616e6c')
        .send(update);

      expect(res.statusCode).toBe(204);
    });

    // POST Test
    test('responds to POST /member', async () => {
      const postInfo = {
        firstName: "Succesful",
        lastName: "Test",
        email: "Succesful@Test.com",
        password: "123456789",
        admin: false,
        ageGroup: "Adult",
        wardId: "6493925960042c532a58a087",
        organizations: ["649345be812b4a3f37335cf6", "649345be812b4a3f37335cf8"],
        __v: 0
      };

      const res = await request(app)
        .post('/member')
        .send(postInfo);

      expect(res.statusCode).toBe(201);
    });
  });
});
