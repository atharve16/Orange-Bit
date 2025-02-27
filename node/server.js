const http = require('http');
const nodemailer = require('nodemailer');
require('dotenv').config();

const server = http.createServer((request, response) => {
    // Create the transporter with your email service details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'atharve211@gmail.com',
        subject: 'Node.js Mail Testing!',
        text: 'Hello, this is a test email!',
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('Email sent successfully');
        }
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
