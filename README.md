
# مستندات API سیستم فایل KFS (Kani File System)

## معرفی

فایل سیستم KFS یک سیستم فایل مجازی است که قابلیت‌های نسخه‌بندی و ادغام را فراهم می‌کند و برای کار با مخازن محلی و remote طراحی شده است. این مستندات متدهای API و الگوهای استفاده از KFS را پوشش می‌دهد.

## فهرست مطالب

1. [نحوه استفاده](#نحوه-استفاده)
2. [نصب و حذف سیستم فایل](#نصب-و-حذف-سیستم-فایل)
3. [عملیات روی فایل‌ها](#عملیات-روی-فایل‌ها)
4. [عملیات روی دایرکتوری‌ها](#عملیات-روی-دایرکتوری‌ها)
5. [نسخه‌بندی](#نسخه‌بندی)
6. [ادغام](#ادغام)
7. [پیکربندی](#پیکربندی)
8. [نمونه استفاده](#نمونه-استفاده)
9. [مدیریت خطاها](#مدیریت-خطاها)

## نحوه استفاده

### ایجاد یک نمونه KFS

```javascript
import { KFS } from "./kfs.js";
const kfs = new KFS();
```

کانستراکتور به طور خودکار سیستم فایل را مقداردهی اولیه می‌کند. نیاز به مقداردهی اولیه صریح نیست. اگر می‌خواهید از service worker استفاده کنید، باید فایل‌های KFS را با ساختار دانلود شده در ریشه قرار دهید و به این صورت آن را فراخوانی کنید.

## نصب و حذف سیستم فایل

### `mount(path, fsType, fsName, fetchMethod, options)`

یک سیستم فایل را در مسیر مشخص شده نصب می‌کند.

**پارامترها:**
- `path*` (رشته): مسیر نصب (مثلاً "/repo1")
- `fsType*` (رشته): نوع سیستم فایل ("memory" یا "idb")
- `fsName*` (رشته): نام سیستم فایل
- `fetchMethod*` (رشته): روش واکشی محتوا : disk یا git
- `options` (شیء): گزینه‌های پیکربندی
  - `fetchInfo` (شیء): اطلاعات مخزن Git
    - `url` (رشته): آدرس مخزن
	    - در صورت عدم وجود url، مخزن به صورت محلی ایجاد میشود.
    - `username` (رشته): نام کاربری Git/توکن دسترسی شخصی
    - `password` (رشته): رمز عبور Git
    - `name` (رشته): نام کاربر برای کامیت‌ها
    - `email` (رشته): ایمیل کاربر برای کامیت‌ها
  - `useSW` (boolean): آیا از Service Worker استفاده شود (باید آن را ثبت نیز کنید)
  - `merging` (شیء): پیکربندی ادغام
    - `strategy` (رشته): "clock" یا "immediate" یا "batch"
    - `interval` (عدد): فاصله زمانی به میلی‌ثانیه برای استراتژی clock
    - `number` (عدد): تعداد عملیات برای ادغام در استراتژی batch
    - `onConflictStrategy` (رشته): "remote"، "local" یا "combine"
    - `syncUrl` : میتواند url متفاوتی از fetchurl باشد، این آدرس از username, password تعریف شده در fetchinfo استفاده میکند.
  - `versioning` (شیء): پیکربندی نسخه‌بندی
    - `strategy` (رشته): "clock" یا "immediate" یا "batch"
    - `interval` (عدد): فاصله زمانی به میلی‌ثانیه برای استراتژی clock
    - `number` (عدد): تعداد نسخه‌هایی که نگهداری می‌شود

**مثال:**
```javascript
await kfs.mount("/path", "memory", "fsName", "git", {
  fetchInfo: {
    url: 'https://github.com/ahmadkani/ahmadkani',
    username: 'github_personalAccessToken',
    password: '',
    name: 'ahmad',
    email: 'ahmad@kani.com',
  },
  useSW: false,
  merging: { strategy: 'clock', interval: 2000, onConflictStrategy: 'remote' },
  versioning: { strategy: 'immediate', interval: 10, number: 5 },
});
```

### `unmount(path, fsName)`

سیستم فایل را از مسیر مشخص شده حذف می‌کند.

**پارامترها:**
- `path` (رشته): مسیر نصب
- `fsName` (رشته): نام سیستم فایل برای حذف

**مثال:**
```javascript
await kfs.unmount("/path", "fsName");
```

## عملیات روی فایل‌ها

### `create(path, type, content, mode)`

یک فایل یا دایرکتوری ایجاد می‌کند.

**پارامترها:**
- `path` (رشته): مسیر ایجاد
- `type` (رشته): "file" یا "dir"
- `content` (رشته): محتوای فایل (پیش‌فرض: "")
- `mode` (رشته): "w" (نوشتن/حذف محتوای قبلی) یا "a" (الحاق) (پیش‌فرض: "w")

**مثال‌ها:**
```javascript
// ایجاد یک فایل جدید
await kfs.create("/path/fsName/file.txt", "file", "Hello World!");

// الحاق به یک فایل موجود
await kfs.create("/path/fsName/file.txt", "file", "\nMore content", "a");

// ایجاد یک دایرکتوری
await kfs.create("/path/fsName/newdir", "dir");
```

### `read(path)`

یک فایل یا دایرکتوری را می‌خواند.

**پارامترها:**
- `path` (رشته): مسیر خواندن

**مقدار بازگشتی:**
- برای فایل‌ها: محتوای فایل به صورت رشته
- برای دایرکتوری‌ها: آرایه‌ای از ورودی‌های دایرکتوری به شکل:
```javascript
	[
		{
			"path": "file.txt",
			"type": "file"
		},
		{
			"path": "directory",
			"type": "dir"
		}
	]
```

**مثال‌ها:**

```javascript
// خواندن یک فایل
const content = await kfs.read("/path/fsName/file.txt");

// خواندن یک دایرکتوری
const entries = await kfs.read("/path/fsName");
```

### `remove(path)`

یک فایل یا دایرکتوری را حذف می‌کند.

**پارامترها:**
- `path` (رشته): مسیر حذف

**مثال:**

```javascript
await kfs.remove("/path/fsName/file.txt");
```

## عملیات روی دایرکتوری‌ها

دایرکتوری‌ها از طریق متد `create` با `type: "dir"` و متد `remove` مدیریت می‌شوند. مثال‌ها را در بالا ببینید.
## نسخه‌بندی

نسخه‌بندی به طور خودکار بر اساس پیکربندی ارائه شده هنگام نصب مدیریت می‌شود. سیستم از سه استراتژی پشتیبانی می‌کند:

1. **Immediate**: نسخه‌ها بلافاصله پس از هر عملیات ایجاد می‌شوند
2. **Clock**: نسخه‌ها در فواصل زمانی منظم ایجاد می‌شوند
3. **Batch**: نسخه‌ها پس از تعداد مشخصی عملیات ایجاد می‌شوند.

## ادغام

### `merge()`

به صورت دستی عملیات ادغام را آغاز می‌کند.

**مثال:**
```javascript
await kfs.merge();
```

### استراتژی‌های ادغام

1. **Immediate**: ادغام بلافاصله پس از هر عملیات انجام می‌شود
2. **Clock**: ادغام در فواصل زمانی منظم انجام می‌شود
3. **Batch**: ادغام پس از تعداد مشخصی عملیات انجام می‌شود.

### حل تعارض

هنگامی که در حین ادغام تعارض رخ می‌دهد، می‌توانید مشخص کنید چگونه حل شود `onConflictStrategy` :

1. **remote**: ترجیح نسخه remote
2. **local**: ترجیح نسخه local
3. **combine**: تلاش برای ترکیب هر دو نسخه با جداکننده‌ها

## پیکربندی

### `setUserConfigs(args)`

پیکربندی کاربر را برای کامیت‌ها و اطلاعات دریافتی تنظیم مجدد می‌کند.

**پارامترها:**
- `args` (شیء): اطلاعات کاربر
  - `name` (رشته): نام کاربر
  - `email` (رشته): ایمیل کاربر
  - `username` (رشته): نام کاربری Git
  - `password` (رشته): رمز عبور/توکن Git

**مثال:**
```javascript
await kfs.setUserConfigs({
  username: '',
  password: '',
  name: 'ahmad',
  email: 'ahmad@kani.com',
});
```

### `setMergingStrategy(mergingStrategy)`

استراتژی ادغام را تنظیم یا تغییر می‌دهد.

**پارامترها:**
- `mergingStrategy` (رشته): "immediate" یا "clock" یا "batch"

**مثال:**
```javascript
await kfs.setMergingStrategy({ 
	strategy: 'batch', number: 5, onConflictStrategy: 'remote'
});
```

### `setVersioingStrategy(versioningStrategy)`

استراتژی نسخه‌بندی را تنظیم یا تغییر می‌دهد.

**پارامترها:**
- `versioningStrategy` (رشته): "immediate" یا "clock" یا "batch"

**مثال:**
```javascript
await kfs.setVersioingStrategy({ 
	strategy: 'immediate'
});
```

## نمونه استفاده

در اینجا یک مثال کامل از استفاده از KFS آمده است:

```javascript
import { KFS } from "./kfs.js";

const kfs = new KFS();

async function main() {
  try {
    // نصب یک مخزن
    await kfs.mount("/repo1", "memory", "1", "git", {
      fetchInfo: {
        url: 'https://github.com/repo',
        username: '',
        password: '',
        name: 'ahmad',
        email: 'ahmad@kani.com',
      },
      merging: { strategy: 'clock', interval: 20000, onConflictStrategy: 'remote', syncUrl: 'https://github.com/repo' },
      versioning: { strategy: 'batch', interval: 10, number: 5 },
    });

    // تنظیم پیکربندی کاربر
    await kfs.setUserConfigs({
      username: '',
      password: '',
      name: 'ahmad',
      email: 'ahmad@kani.com',
    });

    // ایجاد و نوشتن در یک فایل
    await kfs.create("/repo1/1/test.txt", "file", "Hello KFS!");
    
    // خواندن فایل
    const content = await kfs.read("/repo1/1/test.txt");
    console.log(content);

    // ایجاد یک دایرکتوری
    await kfs.create("/repo1/1/mydir", "dir");
    
    // لیست محتویات دایرکتوری
    const entries = await kfs.read("/repo1");
    console.log(entries);

    // آغاز دستی عملیات ادغام
    await kfs.merge();

    // حذف سیستم فایل پس از اتمام
    await kfs.unmount("/repo1", "1");
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
```

## مدیریت خطاها

تمام متدهای KFS در صورت شکست عملیات خطا پرتاب می‌کنند. همیشه فراخوانی‌ها را در بلوک‌های try/catch قرار دهید:

```javascript
try {
  await kfs.create("/repo1/file.txt", "file", "content");
} catch (error) {
  console.error("Failed to create file:", error.message);
}
```

سناریوهای رایج خطا:
- مسیرهای نامعتبر
- مشکلات دسترسی
- خطاهای شبکه (برای عملیات remote)
- تعارضات نسخه‌بندی/ادغام
- خطاهای پر شدن سیستم فایل

## یکپارچه‌سازی Service Worker

KFS می‌تواند با یک Service Worker برای قابلیت‌های آفلاین کار کند:

```javascript
import { serviceWorker } from "./kfs.js";

// ثبت Service Worker
await serviceWorker.register({ scope: "/", enableSync: true });

// لغو ثبت در صورت نیاز
await serviceWorker.unregister();
```

## بهترین روش‌ها

1. همیشه قبل از عملیات بررسی کنید که مسیر وجود دارد
2. خطاها را به شکل مناسب مدیریت کنید
3. سیستم‌های فایل را وقتی دیگر نیاز نیستند حذف کنید
4. برای عملیات remote، احراز هویت مناسب را فراهم کنید
5. استراتژی‌های نسخه‌بندی و ادغام را بر اساس مورد استفاده خود انتخاب کنید
6. برای ویرایش مشارکتی، ادغام مکررتر را در نظر بگیرید

## محدودیت‌ها

1. در حال حاضر فقط از سیستم‌های فایل مبتنی بر memory و indexeddb پشتیبانی می‌کند
2. یکپارچه‌سازی remote محدود به سایت‌های مبتنی بر Git است
3. یکپارچه‌سازی Git نیاز به احراز هویت مناسب دارد
4. مدیریت فایل‌های بزرگ ممکن است نیاز به بهینه‌سازی داشته باشد
5. حل تعارض ابتدایی است (remote/local/combine)

این مستندات عملکرد اصلی KFS را پوشش می‌دهد. برای استفاده پیشرفته یا سناریوهای خاص، کد منبع را بررسی کنید یا با نگهدارندگان تماس بگیرید.