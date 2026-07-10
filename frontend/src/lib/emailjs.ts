import emailjs from '@emailjs/browser';

const SERVICE_ID = '__EMAILJS_SERVICE_ID__';
const TEMPLATE_ID = '__EMAILJS_TEMPLATE_ID__';
const PUBLIC_KEY = '__EMAILJS_PUBLIC_KEY__';

export const sendEmailNotification = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const templateParams = {
    to_email: 'karmarahul67@gmail.com',
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
    timestamp: new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }),
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};
