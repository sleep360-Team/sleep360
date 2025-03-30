import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "127.0.0.1",
        port: 1025,
        secure: false,
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your app password
    }
});

export async function sendResetEmail(userEmail, resetLink) {
    const mailOptions = {
        from: 'sleep360.rhit@proton.me',
        to: userEmail,
        subject: "Password Reset Request",
        html: `
            <p>You requested a password reset.</p>
            <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
            <p>This link will expire in 30 minutes.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Reset email sent to:", userEmail);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
