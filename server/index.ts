import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { accounts, categories, transactions } from "./mockData";
import { cors } from "hono/cors";
import { SpendTracker } from "./types";
import { z } from "zod";
import { randomUUID } from "node:crypto";

const app = new Hono();

// allow all requests regardless of origin (probably not something we'd do in
// production, dependant on product/service)
app.use(cors())


const spendTrackersDatabase: SpendTracker[] = []

app
  .get("/accounts", (c) => {
    return c.json(accounts);
  })
  .get("/categories", (c) => {
    return c.json(categories);
  })
  .get("/transactions", (c) => {
    return c.json(transactions);
  })
  .get("/spending-trackers", (c) => {
    return c.json(spendTrackersDatabase)
  })
  .post("/spending-trackers/create", async (c) => {
    try {
      const body = await c.req.json();
      // parse the request body for expected params
      const parseResult = z.object({
        spendLimit: z.number(),
        categoryId: z.string(),
        interval: z.enum(["week", "month"]),
      }).safeParse(body);

      if(parseResult.success === false) {
        return c.json({
          error: "bad syntax",
        }, 400)
      }

      const newSpendTracker: SpendTracker = {
        id: randomUUID(),
        category_id: parseResult.data.categoryId,
        spend_limit: parseResult.data.spendLimit,
        interval: parseResult.data.interval,
      }

      spendTrackersDatabase.push(newSpendTracker)

      return c.json(newSpendTracker);

    } catch (error) {
      return c.json({
        error: "failed to parse body", 
      }, 400)
    }



  });

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
