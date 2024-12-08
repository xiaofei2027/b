import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Enable CORS with specific origin
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Create uploads directory if it doesn't exist
const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB
  }
});

// Upload route
app.post('/api/videos/upload', upload.single('video'), (req, res) => {
  console.log('Received upload request');
  if (!req.file) {
    console.log('No file uploaded');
    return res.status(400).json({ message: '没有文件被上传' });
  }
  
  console.log('File uploaded successfully:', req.file.filename);
  res.json({
    url: `http://localhost:${port}/uploads/${req.file.filename}`,
    fileId: req.file.filename
  });
});

// Serve static files
app.use('/uploads', express.static(uploadsDir));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: '文件大小超过限制' });
    }
    return res.status(400).json({ message: err.message });
  }
  
  res.status(500).json({ message: '服务器内部错误' });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
  console.log(`上传目录: ${uploadsDir}`);
});