import fs from "node:fs";
import axios from "axios";

import configObj from "../src/config";

const ENDPOINT = "entities";
const ENTITY_TOKEN = "P-MsTPWjyg80EF8WABaAEz";

const url = configObj.baseUrl + ENDPOINT;

const bodyObj = {
    "name": "driver_license",
    "extension": "jpg",
    "type": "license"
};

const postEntity = async (url: string, token: string): Promise<void> => {
    const entityUrl = `${url}/${token}/documents`;
    const response = await axios.post(entityUrl, JSON.stringify(bodyObj), {
        headers: {
            "Authorization": configObj.authorization,
            "Content-Type": "application/json"
        }
    });

    const documentToken = response.data.document_token;
    const data = fs.readFileSync("../images/license.jpg");
    const entityUrlWithDocumentToken = `${url}/${token}/documents/${documentToken}`;

    const formResponse = await axios.put(entityUrlWithDocumentToken, data, {
        headers: {
            "Content-Type": "application/octet-stream",
            "Authorization": configObj.authorization
        }
    });
    
    console.log(formResponse.data);
};

postEntity(url, ENTITY_TOKEN);