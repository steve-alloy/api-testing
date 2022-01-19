import fs from "node:fs";
import axios from "axios";
import FormData, { from } from "form-data";

import configObj from "../src/config";

const ENDPOINT = "entities";
const ENTITY_TOKEN = "P-MsTPWjyg80EF8WABaAEz";

const url = configObj.baseUrl + ENDPOINT;

const bodyObj = {
    "name": "driver_license",
    "extension": "png",
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

    const form = new FormData();
    const stream = fs.createReadStream("../images/photo.png");
    form.append("file", stream);

    const entityUrlWithDocumentToken = `${url}/${token}/documents/${documentToken}`;

    const formResponse = await axios.put(entityUrlWithDocumentToken, form, {
        headers: {
            "Authorization": configObj.authorization,
            ...form.getHeaders()
        }
    });
    
    console.log(formResponse);
};

postEntity(url, ENTITY_TOKEN);