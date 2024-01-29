export const ForgotPasswordTemplate = (name: string, Link: string): string => `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Email Reset Password</title>
    <meta name="description" content="Email Request Template.">
    <style type="text/css">
  .container{width:90%;margin:10px auto}

  a {
    padding: 8px 16px;
    background-color: #34D399;
    color: white !important;
    font-weight:bold;
    border-radius: 30px;
    text-decoration: none;
    transition: background-color 0.3s;
  }

  a:hover {
    background-color: #2FA883;
    color: white;
  }
  p{
    padding:5px
  }

    </style>
</head>

<body>
  <div class="container">
  <div>
  <img src="https://i.ibb.co/GsXtnbL/logo.png" alt="Pixel38" width="100px" height="100px">
  </div>
  <div>

  <h2>Dear ${name}</h2>
  <p className="p-5"> Please Click on the below button to reset password.</p>
<a  href="${Link}">Reset Password</a>

  </div>
  </div>

</body>

</html>

`;
