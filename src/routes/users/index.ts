import { user } from "@app/types/users";
import Router from "@koa/router";
import { Context } from "koa";

const userRouter = new Router();

// Data sementara
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Handler untuk GET /users
userRouter.get('/users', async (ctx: Context) => {
  ctx.body = users;
});

userRouter.post('/users', async (ctx: Context) => {
  const body = ctx.request.body as user;

  if (!body.name || !body.email) {
    ctx.status = 400;
    ctx.body = { error: 'Nama dan email harus diisi' };
    return;
  }

  const newUser: user = {
    id: users.length + 1,
    name: body.name,
    email: body.email
  };

  users.push(newUser);
  ctx.status = 201;
  ctx.body = newUser;
});

export default userRouter;