import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// Render به صورت خودکار پورت را در این متغیر قرار می‌دهد
const PORT = process.env.PORT || 3000;

// ساخت __dirname برای محیط‌های ماژولار (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// سرو کردن فایل‌های استاتیک (خروجی Vite که در پوشه dist ساخته شده)
app.use(express.static(path.join(__dirname, 'dist')));

// هدایت تمام درخواست‌ها به index.html برای کارکرد صحیح React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// استارت سرور
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});