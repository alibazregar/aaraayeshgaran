const app = require('./src/app');
const port = process.env.PORT || 3000;
require("dotenv").config()
const connectDB = require("./db/connect")
async function connect(){
  await connectDB(process.env.MONGO_URL);
  app.listen(port, () => {
  console.log(`listening on port ${port}........`);
 });
}


connect()