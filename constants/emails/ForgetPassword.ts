const EmailTemplate = (link: string) => {
  return `
<div style="background-color: #f1f1f1; padding: 2rem; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " dir="auto">
  <div style="margin: auto;">
    <h1 style="color: #29221f">كتبي - طلب إعادة تعيين كلمة المرور</h1>
    <div style="margin-bottom: 2rem">
      <p style="font-size: large; margin-bottom: 4rem; color: #81322a;">
        لقد تلقيت هذا البريد الإلكتروني لأننا تلقينا طلبًا لإعادة تعيين كلمة المرور لحسابك.
      </p>
        <div style="margin-bottom: 4rem; margin-top: 4rem !important;">
            <a
                style="
                margin-bottom: 4rem;
                text-decoration: none;
                padding: 0.75rem 1.2rem;
                background: #29221f;
                color: #dad7ce;
                cursor: pointer;
                border: 1px solid #29221f;
                border-radius: 0.4rem;
                "
                href=${link}
                target="_blank"
                >إعادة تعيين كلمة المرور
            </a>
        </div>
      <a
        style="
          color: #a38579;
          cursor: pointer;
        "
        href="https://kotbi.elmajdoub.live"
        target="_blank"
        >العودة إلى الموقع
      </a>
    </div>
    <div style="margin-bottom: 2rem">
      <div style="margin-top: 2rem">
        <b>اتمنى لك يوم جيد !</b>
      </div>
      <small style="color: #a38579">فريق كتبي.</small>
    </div>
  </div>
</div>
`;
};
const EmailSubject = "كتبي - طلب إعادة تعيين كلمة المرور";

export { EmailSubject, EmailTemplate };
