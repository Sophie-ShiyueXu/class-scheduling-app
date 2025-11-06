import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type NextOrObserver, type User} from 'firebase/auth';
import { flushSync } from 'react-dom'


const firebaseConfig = {
  apiKey: "AIzaSyCCoTyn1RjaWhCD18hJ7pC39uDvzg6sYcw",
  authDomain: "class-scheduling-app-sophie.firebaseapp.com",
  databaseURL: "https://class-scheduling-app-sophie-default-rtdb.firebaseio.com",
  projectId: "class-scheduling-app-sophie",
  storageBucket: "class-scheduling-app-sophie.firebasestorage.app",
  messagingSenderId: "135925297721",
  appId: "1:135925297721:web:5421c684f883beb22b93e8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};
const firebaseSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
export { firebaseSignOut as signOut };
export interface AuthState {
  user: User | null,
  isAuthenticated: boolean,
  isInitialLoading: boolean
}
export const addAuthStateListener = (fn: NextOrObserver<User>) => (
  onAuthStateChanged(auth, fn)
);
export const useAuthState = (): AuthState => {
  const [user, setUser] = useState(auth.currentUser)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const isAuthenticated = !!user;

  useEffect(() => addAuthStateListener((user: User | null) => {
      flushSync(() => {
        setUser(user);
        setIsInitialLoading(false);
      })
    }), [])

  return {user, isAuthenticated, isInitialLoading };
};

export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState<unknown>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    
    const unsubscribe = onValue(
      ref(database, path), 
      (snapshot) => {
        setData(snapshot.val());
        setLoading(false);
      }, 
      (error) => {
        console.error('Database query error:', error);
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [path]);

  return [data, loading, error];
};


export const updateCourse = async (courseId: string, courseData: Record<string, any>) => {
  try {
    const courseRef = ref(database, `courses/${courseId}`);
    await update(courseRef, courseData);
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

export const setCourse = async (courseId: string, courseData: Record<string, any>) => {
  try {
    const courseRef = ref(database, `courses/${courseId}`);
    await set(courseRef, courseData);
  } catch (error) {
    console.error('Error setting course:', error);
    throw error;
  }
};

// Helper function to initialize course data from JSON file if database is empty
export const initializeCourseData = async (jsonData: Record<string, any>) => {
  try {
    const rootRef = ref(database, '/');
    await set(rootRef, jsonData);
    console.log('Course data initialized successfully');
  } catch (error) {
    console.error('Error initializing course data:', error);
    throw error;
  }
};
