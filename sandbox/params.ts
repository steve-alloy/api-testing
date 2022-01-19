import axios from "axios";
import configObj from "../src/config";
const ENDPOINT = "parameters";

const url = configObj.baseUrl + ENDPOINT;

const getParams = async (url: string): Promise<void> => {
    const response = await axios.get(url, {
        headers: {
            "Authorization": configObj.authorization,
            "Content-Type": "application/json"
        }
    });
    const data = response.data;
    const requiredFields = data.required.map((field: { key: string; }) => field.key);
    const optionalFields = data.optional.map((field: { key: string; }) => field.key);

    console.log("Required fields: ", requiredFields);
    console.log("Optional fields: ", optionalFields);
}

getParams(url);