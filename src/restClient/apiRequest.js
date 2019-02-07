export const apiRequest = (url,options)=>{
        return fetch(url,options).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                if (response.status < 500) {
                    return response.json().then(responseJson => Promise.reject({ status: response.status, message: responseJson.statusText }));
                } else {
                    return Promise.reject({status: response.status, message: "Internal server error"});
                }
            }
        })
            .then(responseJson => {
                let responseObject = { data: responseJson }
                return Promise.resolve(responseObject);
            });
}