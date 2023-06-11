import nodemailer from "nodemailer";

const sendActivationMail = async (to: string, activationCode: string) => {
    try {
        const
            host = process.env.SMTP_HOST,
            port = process.env.SMTP_PORT,
            user = process.env.SMTP_USER,
            pass = process.env.SMTP_PASSWORD,
            url = process.env.SERVER_URL,
            secure = process.env.SMTP_SECURE;
        if (!host || !port || !user || !pass || !url) {
            return ({
                status: false,
                msg: "The email sender is not configured correctly. Fill in all SMTP and URL fields in .env"
            });
        }

        const activationLink = `${url}/api/user/activate/${activationCode}`;

        const transporter = nodemailer.createTransport({
            host,
            port: +port,
            secure: secure === "true",
            auth: {
                user,
                pass,
            }
        });

        const a = await transporter.sendMail({
            from: user,
            to,
            subject: 'Account activation',
            html: `
                    <div>
                        <h1>To activate your account please click here:</h1>
                        <a href=${activationLink}>${activationLink}</a>
                    </div>
                `
        });

        if (a?.accepted) {
            console.log("====================== email accepted ======================");
            console.log(a?.accepted);
            return ({ status: true });
        } else return ({
            status: false,
            msg: "Email with activation link cannot be sent. Please try again later!"
        });
    } catch (error) {
        if (error instanceof Error) {
            return ({
                status: false,
                msg: `The email sender is not configured correctly. Please try again later! ${error.message}`
            });
        }
    }
};

export default sendActivationMail;