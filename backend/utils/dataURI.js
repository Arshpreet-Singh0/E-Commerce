import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();

    // Ensure the file has the originalname property
    if (file && file.originalname) {
       
        const extName = path.extname(file.originalname).toString();
        return parser.format(extName, file.buffer);
    }
    else{
        return null;
    }

}

export default getDataUri;
