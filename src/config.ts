import { Buffer } from "node:buffer";
import dotenv from "dotenv";

dotenv.config({
    "path": "../.env"
});

const workflowToken = process.env.WORKFLOW_TOKEN;
const workflowSecret = process.env.WORKFLOW_SECRET;

const authorization = "Basic " + Buffer.from(`${workflowToken}:${workflowSecret}`, "utf-8").toString("base64");
const configObj = {
    authorization,
    baseUrl: "https://sandbox.alloy.co/v1/"
};

export default configObj;

