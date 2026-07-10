import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_bg7h3ud';
const ADMIN_TEMPLATE_ID = 'template_k9mgt9b';
const AUTOREPLY_TEMPLATE_ID = 'template_dnt3gxk';
const PUBLIC_KEY = 'CwmmhoGWiL1tsVViV';

export const sendEmailNotification = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const adminParams = {
    to_email: 'karmarahul67@gmail.com',
    from_name: data.name,
    from_email: data.email,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    timestamp,
  };

  const replyParams = {
    to_email: data.email,
    from_name: data.name,
    from_email: data.email,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    timestamp,
  };

  const adminEmail = emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, adminParams, PUBLIC_KEY);
  const autoReply = emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, replyParams, PUBLIC_KEY);

  return Promise.all([adminEmail, autoReply]);
};
