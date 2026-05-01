// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARd9d_K9eaxYwqko5E2uJGtdG1ALWz0oA",
  authDomain: "my-portfolio-ea035.firebaseapp.com",
  projectId: "my-portfolio-ea035",
  storageBucket: "my-portfolio-ea035.firebasestorage.app",
  messagingSenderId: "1021094437123",
  appId: "1:1021094437123:web:9ec34b919971c2fe794936",
  measurementId: "G-XSD5SY33H5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Initialize Analytics with a check for browser support
let analytics: Analytics | null = null;

// This function will initialize analytics if supported
export const initAnalytics = async (): Promise<Analytics | null> => {
  try {
    if (await isSupported()) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
      return analytics;
    } else {
      console.log("Firebase Analytics not supported in this environment");
      return null;
    }
  } catch (error) {
    console.error("Error initializing Firebase Analytics:", error);
    return null;
  }
};

// Contact form interface
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectTitle?: string | null;
  type?: 'project_inquiry' | 'general_contact';
  createdAt?: Timestamp;
  timestamp?: Timestamp;
}

// Newsletter subscription interface
export interface NewsletterSubscription {
  email: string;
  subscribedAt: Timestamp;
  timestamp: Timestamp;
}

// Save contact form data to Firestore
export const saveContactForm = async (formData: ContactFormData): Promise<string> => {
  try {
    const contactsCollection = collection(db, "contacts");
    const docRef = await addDoc(contactsCollection, {
      ...formData,
      createdAt: Timestamp.now(),
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving contact form:", error);
    throw error;
  }
};

// Get all contact form submissions
export const getContactSubmissions = async (): Promise<ContactFormData[]> => {
  try {
    const contactsCollection = collection(db, "contacts");
    const q = query(contactsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as ContactFormData;
      return {
        ...data,
        id: doc.id
      } as ContactFormData & { id: string };
    });
  } catch (error) {
    console.error("Error getting contact submissions:", error);
    throw error;
  }
};

// Admin authentication
export const loginAdmin = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutAdmin = async () => {
  return signOut(auth);
};

// Delete contact form submission
export const deleteContactSubmission = async (id: string): Promise<void> => {
  try {
    const contactDoc = doc(db, "contacts", id);
    await deleteDoc(contactDoc);
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    throw error;
  }
};

// Delete multiple contact form submissions
export const deleteMultipleContactSubmissions = async (ids: string[]): Promise<void> => {
  try {
    const deletePromises = ids.map(id => deleteContactSubmission(id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting multiple contact submissions:", error);
    throw error;
  }
};

// Save newsletter subscription
export const saveNewsletterSubscription = async (subscription: { email: string }): Promise<string> => {
  try {
    const newsletterCollection = collection(db, "newsletter");
    const docRef = await addDoc(newsletterCollection, {
      ...subscription,
      subscribedAt: Timestamp.now(),
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving newsletter subscription:", error);
    throw error;
  }
};

// Get all newsletter subscriptions
export const getNewsletterSubscriptions = async (): Promise<NewsletterSubscription[]> => {
  try {
    const newsletterCollection = collection(db, "newsletter");
    const q = query(newsletterCollection, orderBy("subscribedAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as NewsletterSubscription;
      return {
        ...data,
        id: doc.id
      } as NewsletterSubscription & { id: string };
    });
  } catch (error) {
    console.error("Error getting newsletter subscriptions:", error);
    throw error;
  }
};

// Delete newsletter subscription
export const deleteNewsletterSubscription = async (id: string): Promise<void> => {
  try {
    const newsletterDoc = doc(db, "newsletter", id);
    await deleteDoc(newsletterDoc);
  } catch (error) {
    console.error("Error deleting newsletter subscription:", error);
    throw error;
  }
};

// Delete multiple newsletter subscriptions
export const deleteMultipleNewsletterSubscriptions = async (ids: string[]): Promise<void> => {
  try {
    const deletePromises = ids.map(id => deleteNewsletterSubscription(id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting multiple newsletter subscriptions:", error);
    throw error;
  }
};

// Export the Firebase app, auth, db and analytics
export { app, auth, db, analytics };
