import Router from "@koa/router";

const router = new Router();

router.get("/", (ctx) => {
  ctx.body = "Hallo Dunia";
});

export default router;