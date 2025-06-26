import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();

router.get("/sub", (req, res) => {
    res.send("sub express netlify")
});

router.get("/", (req, res) => {
    res.send("main express netlify")
});

api.use("/api/express/", router);

export const handler = serverless(api);
