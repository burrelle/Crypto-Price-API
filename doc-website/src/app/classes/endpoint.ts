export class Endpoint {
    // endpoint name
    name: string;
    // endpoint base url (e.g. "www.google.com")
    base_url: string;
    // endpoint path (e.g. "/api/price")
    path: string;
    // Array of params for endpoint
    params: {param_name: string, param_desc: string, required: boolean, example: string}[];
    // Array of return values for endpoint
    returns: {return_name: string, return_type: string, return_desc: string}[];
}
