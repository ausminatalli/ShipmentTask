export const VerifyAccountTemplate = (name: string, link: string): string => `
<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="utf-8">
    <title>Email Account Verification</title>
    <meta name="description" content="Email Verification Template.">
    <style>
        .container {
            width: 90%;
            margin: 10px auto;
        }

        a {
            padding: 8px 16px;
            background-color: #34D399;
            color: white !important;
            font-weight: bold;
            border-radius: 30px;
            text-decoration: none;
            transition: background-color 0.3s;
        }

        a:hover {
            background-color: #2FA883;
            color: white;
        }

        p {
            padding: 5px;
        }
    </style>
</head>

<body>
    <div className="container">
        <div>
            <img src="https://i.ibb.co/GsXtnbL/logo.png" alt="Pixel38" width="100px" height="100px">
        </div>
        <div>
            <h2>Dear ${name}</h2>
            <p className="p-5">Thank you for signing up. Please click on the below button to verify your account.</p>
            <a href="${link}">Verify Account</a>
        </div>
    </div>
</body>

</html>
`;
