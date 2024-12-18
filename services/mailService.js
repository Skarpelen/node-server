import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your_email@example.com',
    pass: 'your_password',
  },
});

async function sendActivationEmail(to, token) {
  const activationLink = `http://localhost:8000/activate?token=${token}`;
  await transporter.sendMail({
    from: '"Your App" <your_email@example.com>',
    to,
    subject: 'Activate your account',
    html: `<p>Please activate your account by clicking <a href="${activationLink}">here</a>.</p>`
  });
}

export { sendActivationEmail };
