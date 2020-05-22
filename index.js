const axios = require("axios");
// secrets 

let app_id = "";
let app_secret = "";
let from = "";

// base URL 
const runner = axios.create({
    baseURL: 'https://api.wittyflow.com/v1/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

/**
 * @param {options : { application_id, application_secret, senderName }} - option that contains app_id, app_secret, senderName
 * @description setup the wittyflow module
 * @author Emmanuel Baidooo
 * 
*/

const config = ({ application_id, application_secret, senderName }) => {
    app_id = application_id;
    app_secret = application_secret;
    from = senderName;
}

/**
 * 
 * @description send message to a given phone number
 * @param from - The Sender Name or Address eg. Wittyflow.
 * @param to - The Recipient Mobile Number in the international format eg. 233244111222
 * @param message - The message to send. Should be a minimum of 1 character string and a maximum of 765 characters
 * @param options {type: The Message Type. Use 0 for flash messages or 1 for plain text. , calback_url:'A webhook http url that message status reports will be sent to. If provided, Wittyflow will attempt an HTTP POST request to this URL each time the status of your message changes.}
 * @author Emmanuel Baidooo
*/
const sendMessage = (to,message,options = { type: 1 }) => new Promise((resolve, reject)=> {
    if(!from || !to || (!message && message <= 765)){
        reject("Read the docs");
    }
    const form = {
        app_id,
        app_secret,
        from,
        to,
        message,
        ...options
    }
    console.log(form)
    runner.post("/messages/send", form).then(({data}) => {
        if(data.status !== "success"){
            reject(data.message)
        }else  resolve(true);
    })
    .catch(({response, request}) => {
        if(response) reject(response.data.message);
        if(request) reject(request.message)
    })
});


module.exports =  {
    config,
    sendMessage
}