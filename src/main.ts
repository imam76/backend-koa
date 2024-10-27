import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import userRouter from './routes/users';

const app = new Koa();
const port = 5454;

// Middleware untuk parsing body
app.use(bodyParser());

// logger
app.use(async (ctx: { response: { get: (arg0: string) => any; }; method: any; url: any; }, next: () => any) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx: { set: (arg0: string, arg1: string) => void; }, next: () => any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// Pasang router ke Koa
app.use(router.routes()).use(router.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

app.listen(port);

console.log(`🚀 Server is running on port http://localhost:${port}/`);