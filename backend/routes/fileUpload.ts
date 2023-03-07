import { File } from 'buffer';
import express, { Request } from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res, next) => {
  console.log(req.file);
  return res.json({
    success: true,
    message: 'File uploaded successfully',
    link: `uploads/${req.file?.filename}`,
  });
});

export const fileUploadRouter = router;
