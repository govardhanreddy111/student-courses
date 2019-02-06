import { CREATE,GET_LIST,GET_ONE,UPDATE,DELETE} from "./actionTypes";
import {apiRequest} from './apiRequest';

export const httpRequest = (type,resource,params) =>{
    let url = "";
    let options = {};
    let headers = {
        'Content-Type': 'application/json'
    };
    options.headers = headers;
    debugger;
    switch (type) {
        case CREATE:
            url = resource;
            options.method = 'POST';
            options.body = JSON.stringify(params.data);
            break;
        case GET_LIST:
            url = resource;
            options.method = 'GET';
            break;
        case UPDATE:
            url = resource;
            options.method = 'PUT';
            options.body = JSON.stringify(params.data);
            break;
        case DELETE:
            url = resource+'/'+params.id;
            options.method = 'DELETE';
            break;
            default:
                alert("No action found");
    }
    return apiRequest(url,options)
}