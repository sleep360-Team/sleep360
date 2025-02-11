import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your app password
    }
});

export async function sendResetEmail(userEmail, resetLink) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
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
