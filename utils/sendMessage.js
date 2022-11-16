require("dotenv").config();
const kavenegar = require("kavenegar");
const api = kavenegar.KavenegarApi({
  apikey: process.env.SMS_KEY,
});

module.exports = (token, receptor) => {

   api.VerifyLookup(
    {
      token:token,
      sender: "10000300009900",
      receptor: receptor,
      template:"arayeshgaranVerify"
    },
     (response, status) => {
     if(status !== 200) {
      console.log("status : "+ status)
    }
     
      
    },
   
   
  );
};
