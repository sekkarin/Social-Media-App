import multer from "multer";


// file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/assets')
    },
    filename: function (req, file, cb) {
        // console.log(Buffer.from(file.originalname, 'latin1').toString(
        //     'utf8',
        // ));

        // cb(null, file.originalname.toString());
        cb(null, Buffer.from(file.originalname,'latin1').toString('utf8'))
    },
})
export default multer({ storage })