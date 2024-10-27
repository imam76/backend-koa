import request from 'supertest';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import userRouter from '.';

const app = new Koa();

// Middleware untuk parsing body
app.use(bodyParser());

// Pasang router ke Koa
app.use(userRouter.routes()).use(userRouter.allowedMethods());

describe('Users Enpoints', () => {
  it('should return a list of users', async () => {
    const response = await request(app.callback()).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new user', async () => {
    const newUser = { name: "Test User", email: "test@gmail.com" };
    const response = await request(app.callback())
      .post('/users')
      .send(newUser)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: newUser.name,
      email: newUser.email
    });
  })
})

