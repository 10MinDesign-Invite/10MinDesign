export function emailHtml(email: string, otp: string) {
  const emailHtml = `

    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Your One-Time Password (OTP)</title>
  <style>
    body {
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #0f172a;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #111827, #1e293b);
      color: white;
      text-align: center;
      padding: 24px;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      letter-spacing: 0.5px;
    }
    .body {
      padding: 32px 28px;
      text-align: center;
    }
    .body h2 {
      font-size: 20px;
      margin: 0 0 12px;
    }
    .body p {
      font-size: 15px;
      color: #475569;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    .otp-box {
      display: inline-block;
      background: #f1f5f9;
      border: 2px dashed #2563eb;
      color: #1e3a8a;
      font-weight: 700;
      font-size: 28px;
      letter-spacing: 6px;
      padding: 14px 28px;
      border-radius: 10px;
    }
    .note {
      margin-top: 28px;
      font-size: 13px;
      color: #64748b;
    }
    .footer {
      background: #f8fafc;
      padding: 18px 28px;
      font-size: 13px;
      color: #94a3b8;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    @media (max-width: 520px) {
      .body { padding: 24px 16px; }
      .otp-box { font-size: 22px; letter-spacing: 4px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>10MinDesigns</h1>
    </div>
    <div class="body">
      <h2>Your One-Time Password Reset OTP</h2>
      <p>Hello <strong>${email}</strong>,<br>
      Use the following OTP to complete your verification. This code will expire in 5 minutes.</p>
      <div class="otp-box">${otp}</div>
      <p class="note">If you didn’t request this, please ignore this email or contact support.</p>
    </div>
    <div class="footer">
      &copy;  2026  10MinDesigns · All rights reserved.<br>
      <span style="font-size:12px;">This is an automated message, please do not reply.</span>
    </div>
  </div>
</body>
</html>


`;
  return emailHtml;
}
