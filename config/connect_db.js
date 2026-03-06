import mongoose from "mongoose"

const connect_db = () => {
  mongoose.connect("mongodb://localhost:27017/e-commerce")
    .then(() => console.log("connection success"))
    .catch((err) => console.log("error connection db: ", err))
}

export default connect_db;