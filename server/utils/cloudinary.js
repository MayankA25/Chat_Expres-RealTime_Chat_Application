import { v2 as cloudinary } from "cloudinary"
import * as dotenv from "dotenv"

dotenv.config({ path: "D:\\Mayank Data\\CODING\\MERN Projects\\Chat Express\\server\\.env" });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export default cloudinary;