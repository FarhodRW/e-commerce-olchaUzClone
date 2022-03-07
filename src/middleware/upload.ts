import path from 'path'
import multer from 'multer'

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
})

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000000
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif")
      cb(null, true);
    else {
      console.log("incorrect file type");
      return cb(new Error('Please upload an image'))
    }
  }
});

