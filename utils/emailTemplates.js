const PasswordReset=(name,email,link)=>{
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        body {
            font-family: "Poppins", sans-serif;
        }
        .mail_template_design {
            width: 90%;
            margin: 0 auto;
            box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.4);
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 20px 30px;
            border-radius: 10px;
        }
        .mail_banner {
            width: 100%;
            height:500px;
        }

    </style>
</head>

<body>
    <table class="mail_template_design">
        <tr>
            <td>
                <img class="mail_banner" src="https://st.depositphotos.com/42378128/56144/i/450/depositphotos_561444718-stock-photo-rest-password-text-wooden-blocks.jpg">
            </td>
        </tr>
        <tr>
            <td>
                <h3 class="hello_msg">Hello <span>"${name}"</span></h3>
            </td>
        </tr>
        <tr>
            <td>
                <h1 class="welcome_mail"><span > We received a request from your email ${email}, to reset your password. Please click the link below to reset your password:</span></h1>
            </td>
        </tr>
        <tr>
            <td>
                <a href="${link}"><h3 style="color: #000;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 700;
                    text-align:center;
                    margin: 30px 0 30px 0;
                    line-height: normal;">
                         <span style="background: var(--gradiant-2, linear-gradient(96deg, #3ebb4f -14.71%, #2eadc3 100%));
                      padding: 10px 20px;
                      color:#fff;
                        border-radius:5px;
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;">Reset Password</span>
                    </h3></a>
            </td>
        </tr>
        <tr >
            <td>
                <span>If you did not request this, please ignore this email.</span>
            </td>
        </tr>
 
        <tr class="margin_tr">
            <td>
                <span>Team,</span>
            </td>
        </tr>
    </table>
  
</body>

</html>`
}

module.exports={
    PasswordReset
}