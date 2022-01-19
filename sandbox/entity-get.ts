import axios from "axios";
import configObj from "../src/config";
const ENDPOINT = "entities";
const ENTITY_TOKEN = "P-MsTPWjyg80EF8WABaAEz";

const url = configObj.baseUrl + ENDPOINT;

const getEntity = async (url: string, token: string): Promise<void> => {
    const response = await axios.get(url + "/" + token, {
        headers: {
            "Authorization": configObj.authorization,
            "Content-Type": "application/json"
        }
    });
    const data = response.data;

    console.log(data);
};

getEntity(url, ENTITY_TOKEN);