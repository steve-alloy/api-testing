import axios from "axios";
import configObj from "../src/config";
const ENDPOINT = "evaluations";

const url = configObj.baseUrl + ENDPOINT;

const bodyObj = {
    "phone_number": "18042562188",
    "name_first": "John",
    "name_last": "Doe",
    "email_address": "john.doe@example.com",
    "birth_date": "1985-01-23",
    "address_line_1": "1717 E Test St",
    "address_city": "Richmond",
    "address_state": "VA",
    "document_ssn": "123456789",
    "address_postal_code": "23220",
    "address_country_code": "US",
    "social_twitter": "dog_rates"
};

const postEval = async (url: string): Promise<void> => {
    const response = await axios.post(url, JSON.stringify(bodyObj), {
        headers: {
            "Authorization": configObj.authorization,
            "Content-Type": "application/json"
        }
    });

    const evaluationToken = response.data.evaluation_token;

    console.log(response.data.evaluation_token);
    patchEval(url, evaluationToken);
};

postEval(url);

// Doesn't seem to be working...
const patchEval = async (url: string, token: string): Promise<void> => {
    
    const response = await axios.patch(url + "/" + token, JSON.stringify({
        "name_first": "Steve",
        "last_name": "Giordano"
    }), {
        headers: {
            "Authorization": configObj.authorization,
            "Content-Type": "application/json"
        }
    });

    console.log(response);
};
