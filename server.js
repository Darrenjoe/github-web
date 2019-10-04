const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
const Redis = require("ioredis");

const RedisSessionStore = require("./server/session-store");

const dev = process.env.NODE_ENV != "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// 创建Redis-Client
const redis = new Redis();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ["Darren develop Github App"];
  const SESSION_CONFIG = {
    key: "jid",
    store: new RedisSessionStore(redis)
  };
  server.use(session(SESSION_CONFIG, server));

  // server.use(async (ctx, next) => {
  //   console.log(ctx.cookies.get("id"));
  //   // 获取用户数据
  //   // 比如调用 `model/getUserById(id)`
  //   // ctx.session = ctx.session || {};
  //   // ctx.session.user = {
  //   //   username: "Darren",
  //   //   age: 23
  //   // };

  //   if (!ctx.session.user) {
  //     ctx.session.user = {
  //       name: "darren",
  //       age: 18
  //     };
  //   } else {
  //     console.log("session is:", ctx.session);
  //   }

  //   await next();
  // });

  server.use(async (ctx, next) => {
    if (ctx.cookies.get("jid")) {
      ctx.session = {};
    }
    await next();
  });

  router.get("/a/:id", async ctx => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id }
    });
    ctx.respond = false;
  });

  router.get("/set/user", async ctx => {
    // const id = ctx.params.id;
    // await handle(ctx.req, ctx.res, {
    //   pathname: "/a",
    //   query: { id }
    // });
    ctx.respond = false;

    ctx.session.user = {
      username: "Darren",
      age: 23
    };
    ctx.body = "set session success";
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    ctx.cookies.set("id", "userId:xxx");
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log("koa server listening on 3000");
  });
});
