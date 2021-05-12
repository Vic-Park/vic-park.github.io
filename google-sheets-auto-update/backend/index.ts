import "dotenv/config";

import fastify from "fastify";
import { Octokit } from "octokit";
import { nanoid } from "nanoid";

const app = fastify();
const octokit = new Octokit({ auth: process.env.GITHUB_BOT_TOKEN });

app.get("/", (request, reply) => {
  const query: { secret?: string } = request.query;
  if (query.secret !== process.env.SECRET) {
    reply.status(403).send("Not authorized; incorrect secret provided.");
    return;
  }

  octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    content: '',
  })

  octokit.rest.repos.create({
    owner: "Vic-Park",
    repo: "vic-park.github.io",
    head: `sheets:${nanoid(8)}`,
    base: "master",
  });

  reply.send("Request successfully processed.");
});
