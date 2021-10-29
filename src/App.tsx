import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import { Toaster } from 'react-hot-toast';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Header from './components/layouts/Header';
import PollCreated from './pages/PollCreated';
import LivePoll from './pages/LivePoll';

function App() {
  // getDocs(roomsRef).then((querySnapshot) => {
  //   console.log(querySnapshot);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // });

  return (
    <Router>
      <main className="flex flex-col min-h-screen">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/new/:id" component={PollCreated} />
        <Route exact path="/poll" component={LivePoll} />
      </main>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
