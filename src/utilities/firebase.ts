import { initializeApp } from 'firebase/app';
import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, update, set } from 'firebase/database';

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

export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(ref(database, path), (snapshot) => {
        setData( snapshot.val() );
        setLoading(false);
      }, (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [ path ]);

  return [ data, loading, error ];
};


export const updateCourse = async (courseId: string, courseData: any) => {
  const courseRef = ref(database, `courses/${courseId}`);
  return update(courseRef, courseData);
};


export const setCourse = async (courseId: string, courseData: any) => {
  const courseRef = ref(database, `courses/${courseId}`);
  return set(courseRef, courseData);
};
