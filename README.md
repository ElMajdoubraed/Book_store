<!DOCTYPE html>

<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css"
      integrity="sha384-gXt9imSW0VcJVHezoNQsP+TNrjYXoGcrqBZJpry9zJt8PCQjobwmhMGaDHTASo9N"
      crossorigin="anonymous"
    />
    <!-- Bootstrap Scripts -->
  </head>
  <body dir="rtl" lang="ar">
    <div dir="auto" class="container mt-5">
      <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
        <h2 class="text-primary">توثيق المنتج</h2>
        <div dir="auto" class="mt-5">
          <h4 class="">المتطلبات الأساسية</h4>
          <ul class="list-group">
            <li class="list-group-item">
              <details>
                <summary>NodeJs</summary>
                <p>
                  يجب تثبيت NodeJs على جهازك لتتمكن من تشغيل المنتج
                  <br />
                  <a href="https://nodejs.org/en/download/">تحميل NodeJs</a>
                </p>
              </details>
            </li>
            <li class="list-group-item">
              <details>
                <summary>محرر أكواد</summary>
                <p>
                  يمكنك استخدام أي محرر أكواد تفضله لتعديل المنتج
                  <br />
                  <a href="https://code.visualstudio.com/download"
                    >تحميل VSCode</a
                  >
                </p>
              </details>
            </li>
          </ul>
        </div>
        <div dir="auto" class="mt-5">
          <h4 class="">المتطلبات الفرعية</h4>
          <ul class="list-group">
            <li class="list-group-item">
              <details>
                <summary>Git و Github</summary>
                <p>
                  يجب تثبيت Git على جهازك لتتمكن من رفع المنتج
                  <br />
                  <a href="https://git-scm.com/downloads">تحميل Git</a>
                  <br />
                  يجب أن يكون لديك حساب على Github لتتمكن من تحميل المنتج
                  <br />
                  <a href="https://github.com" target="_blank">
                    تسجيل حساب على Github
                  </a>
                </p>
              </details>
            </li>
            <li class="list-group-item">
              <details>
                <summary>Vercel</summary>
                <p>
                  يجب أن يكون لديك حساب على Vercel لتتمكن من رفع المنتج
                  <br />
                  <a href="https://vercel.com/signup" target="_blank"
                    >تسجيل حساب على Vercel</a
                  >
                </p>
              </details>
            </li>
            <li class="list-group-item">
              <details>
                <summary>MongoDb atlas</summary>
                <p>
                  يجب أن يكون لديك حساب على MongoDb atlas لتتمكن من رفع قاعدة
                  البيانات
                  <br />
                  <a
                    href="https://www.mongodb.com/cloud/atlas/register"
                    target="_blank"
                    >تسجيل حساب على MongoDb atlas</a
                  >
                </p>
              </details>
            </li>
            <li class="list-group-item">
              <details>
                <summary>Aws S3</summary>
                <p>
                  يجب أن يكون لديك حساب على Aws S3 لتتمكن من رفع الصور
                  <br />
                  <a href="https://aws.amazon.com/s3/" target="_blank"
                    >تسجيل حساب على Aws S3</a
                  >
                </p>
              </details>
            </li>
          </ul>
        </div>
        <div dir="auto" class="mt-5">
          <h4 class="">تحميل المنتج و التعديل عليه</h4>
          <p class="text-muted">
            بعد تثبيت المتطلبات الأساسية و الفرعية يمكنك تحميل المنتج و التعديل
            عليه بالطريقة التالية
          </p>
          <ul class="list-group">
            <li class="list-group-item">
              <details>
                <summary>تثبيت الحوازم اللازمة</summary>
                <p>
                  بعد تحميل المنتج يجب تثبيت الحوازم اللازمة لتشغيل المنتج
                  <br />
                  <code>npm install --legacy-peer-deps </code>
                </p>
              </details>
            </li>
            <li class="list-group-item">
              <details>
                <summary>
                  تعديل ملف .env بمعلومات الاتصال بقاعدة البيانات و Aws S3
                </summary>
                <p>
                  انشاء ملف .env في مجلد المنتج و يجب تعديله بمعلومات الاتصال
                  بقاعدة البيانات و Aws S3 و الحوازم الأخرى المطلوبة لتشغيل
                  المنتج و يمكنك الاطلاع على ملف .env.sample لمعرفة الحوازم
                </p>
              </details>
            </li>
            <li class="list-group-item">
              <details>
                <summary>التعديل على المنتج و تجربته على الخادم المحلي</summary>
                <p>
                  بعد تثبيت الحوازم اللازمة و تعديل ملف .env يمكنك تجربة المنتج
                  على الخادم المحلي
                  <br />
                  <code>npm run dev</code>
                </p>
              </details>
            </li>
          </ul>
        </div>
        <div dir="auto" class="mt-5">
          <h4 class="">رفع المنتج</h4>
          <p class="text-muted">
            بعد تعديل المنتج و تجربته على الخادم المحلي يمكنك رفع المنتج على
            Github و Vercel بالطريقة التالية
          </p>
          <ul class="list-group">
            <li class="list-group-item">
              <details>
                <summary>رفع المنتج على Github</summary>
                <p>
                  بعد تعديل المنتج يجب رفعه على Github
                  <br />
                  <code>git init</code>
                  <br />
                  <code>git add .</code>
                  <br />
                  <code>git commit -m "first commit"</code>
                  <br />
                  <code>git branch -M main</code>
                  <br />
                  <code>git remote add origin ...</code>
                  <br />
                  <code> git push -u origin main </code>
                  <br />
                  <a href="https://docs.github.com/en/get-started"
                    >المزيد من المعلومات عن Github</a
                  >
                </p>
              </details>
            </li>
            <li class="list-group-item">
              <details>
                <summary>رفع المنتج على Vercel</summary>
                <p>
                  بعد رفع المنتج على Github يجب رفعه على Vercel
                  <br />
                  <a href="https://vercel.com/docs/git" target="_blank"
                    >المزيد من المعلومات عن رفع المنتج على Vercel</a
                  >
                </p>
              </details>
            </li>
          </ul>
        </div>
        <div class="mt-5">
          <h4>طريقة استخدام وتعديل المنتج.</h4>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item">
              <p>
                بعد تحميل المنتج و تنزيل كافة المتطلبات الاساسية يجب تثبيت
                الحوازم اللازمة لتشغيل المنتج
                <br />
                <code>npm install --legacy-peer-deps </code>
              </p>
            </li>
            <li class="list-group-item">
              <p>
                انشاء ملف .env في مجلد المنتج و يجب تعديله بمعلومات الاتصال
                بقاعدة البيانات و Aws S3 و الحوازم الأخرى المطلوبة لتشغيل المنتج
                و يمكنك الاطلاع على ملف .env.sample لمعرفة الحوازم
              </p>
            </li>
            <li class="list-group-item">
              <p>
                بعد تثبيت الحوازم اللازمة و تعديل ملف .env يمكنك تجربة المنتج
                على الخادم المحلي
                <br />
                <code>npm run dev</code>
              </p>
            </li>
            <li class="list-group-item">
              <p>
                بعد تعديل المنتج و تجربته على الخادم المحلي يجب رفعه على Github
                <br />
                <code>git init</code>
                <br />
                <code>git add .</code>
                <br />
                <code>git commit -m "first commit"</code>
                <br />
                <code>git branch -M main</code>
                <br />
                <code>git remote add origin ...</code>
                <br />
                <code> git push -u origin main </code>
                <br />
                <a href="https://docs.github.com/en/get-started"
                  >المزيد من المعلومات عن Github</a
                >
              </p>
            </li>
            <li class="list-group-item">
              <p>
                بعد رفع المنتج على Github يجب رفعه على Vercel
                <br />
                <a href="https://vercel.com/docs/git" target="_blank"
                  >المزيد من المعلومات عن رفع المنتج على Vercel</a
                >
              </p>
            </li>
          </ol>
        </div>
        <footer dir="auto" class="mt-5">
          <p class="text-muted">
            ان واجهتم أي مشاكل في تثبيت المنتج يمكنكم التواصل معنا
          </p>
        </footer>
      </div>
    </div>
  </body>
</html>
