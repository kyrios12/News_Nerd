import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

import Header from './Header';
import NewsList from './NewsList';
import NewsDetail from './NewsDetail';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


  
const firebaseConfig = {
  apiKey: "AIzaSyCb78wisLWo5bKc5VV2BGR4yw0LFLlR-vk",
  authDomain: "news-nerd.firebaseapp.com",
  databaseURL: "https://news-nerd-default-rtdb.firebaseio.com",
  projectId: "news-nerd",
  storageBucket: "news-nerd.appspot.com",
  messagingSenderId: "152856605318",
  appId: "1:152856605318:web:8a4242081dc03620c59707",
  measurementId: "G-2T7RTNDNPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <div>
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <Link>
          <Route path="/" exact>
            <NewsList />
          </Route>
          <Route path="/news/:id">
            <NewsDetail />
          </Route>
        </Link>
      </div>
    </Router>
  );
};

export default App;