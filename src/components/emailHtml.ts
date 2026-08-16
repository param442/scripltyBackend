const res = (url: string) => {
  return `
<!DOCTYPE html>
<html>
  <body style="
    margin: 0;
    padding: 0;
    background-color: #f4f7fb;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
  ">
    <div style="
      max-width: 600px;
      margin: 40px auto;
      padding: 0 20px;
    ">
      <div style="
        background-color: #ffffff;
        border-radius: 12px;
        padding: 40px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      ">
        
        <h1 style="
          margin: 0 0 12px;
          color: #143865;
          font-size: 28px;
        ">
          Welcome to Scriptly! 👋
        </h1>

        <p style="
          margin: 0 0 24px;
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
        ">
          Thanks for creating your Scriptly account.
          Please verify your email address to get started.
        </p>

        <a
          href="${url}"
          style="
            display: inline-block;
            padding: 14px 28px;
            background-color: #143865;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
          "
        >
          Verify My Email
        </a>

        <p style="
          margin: 28px 0 0;
          font-size: 13px;
          line-height: 1.5;
          color: #9ca3af;
        ">
          If you didn't create a Scriptly account, you can safely ignore
          this email.
        </p>

      </div>

      <p style="
        margin: 20px 0;
        text-align: center;
        font-size: 12px;
        color: #9ca3af;
      ">
        © ${new Date().getFullYear()} Scriptly. All rights reserved.
      </p>
    </div>
  </body>
</html>
`;
};

export default res;
