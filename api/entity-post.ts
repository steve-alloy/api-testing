import fs from "node:fs";
import axios from "axios";
import configObj from "../src/config";

const ENDPOINT = "entities";
const ENTITY_TOKEN = "P-MsTPWjyg80EF8WABaAEz";
const url = configObj.baseUrl + ENDPOINT;
const bodyObj = {
  name: "driver_license",
  extension: "jpg",
  type: "license"
};

const postEntity = async (url: string, token: string): Promise<void> => {
  const entityUrl = `${url}/${token}/documents`;
  const responseFromEntity = await axios.post(
    entityUrl,
    JSON.stringify(bodyObj),
    {
      headers: {
        "Authorization": configObj.authorization,
        "Content-Type": "application/json"
      }
    }
  );

  const documentToken = responseFromEntity.data.document_token;
  const file = fs.readFileSync("../images/license.jpg");
  const entityUrlWithDocumentToken = `${url}/${token}/documents/${documentToken}`;

  const responseFromEntityWithDocument = await axios.put(
    entityUrlWithDocumentToken,
    file,
    {
      headers: {
        "Content-Type": "application/octet-stream",
        "Authorization": configObj.authorization
      }
    }
  );

  console.log(responseFromEntityWithDocument.data);
};

postEntity(url, ENTITY_TOKEN);
