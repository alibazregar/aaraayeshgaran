require("dotenv").config();
const kavenegar = require("kavenegar");
const api = kavenegar.KavenegarApi({
  apikey: process.env.SMS_KEY,
});


module.exports = function verifyLookup(token,receptor) {
  
  return new Promise((resolve, reject) => {
    api.VerifyLookup({
      token: token,
      sender: "10000300009900",
      receptor: receptor,
      template: "arayeshgaranVerify",
    }, function(response,status) {
      if (status !==200) {
        reject(status, response);
      } else {
        resolve(status);
      }
    });
  });
}

