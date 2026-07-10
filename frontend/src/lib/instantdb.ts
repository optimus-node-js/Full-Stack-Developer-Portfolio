import { init, id } from '@instantdb/react';

const APP_ID = '__INSTANTDB_APP_ID__';

const db = init({ appId: APP_ID });

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
}

export const saveContact = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const contactId = id();
  await db.transact(
    db.tx.contacts[contactId].update({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      timestamp: Date.now(),
    })
  );
  return contactId;
};

export { db };
