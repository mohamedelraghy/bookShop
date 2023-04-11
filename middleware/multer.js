const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        ;
        cb(null, Date.now().toString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);


    if (mimeType) return cb(null, true);
    else return cb(null, false);

    cb(new Error ("Error: File upload only supports the "
        + "following filetypes - " + fileTypes));
}

const upload = multer({

    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;