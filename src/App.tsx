import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import { Toaster } from 'react-hot-toast';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Header from './components/layouts/Header';
import PollCreated from './pages/PollCreated';
import SubmitVotePage from './pages/SubmitVote';
import PollResults from './pages/PollResults';

function App() {
  return (
    <Router>
      <main className="flex flex-col min-h-screen">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/new/:id" component={PollCreated} />
        <Route exact path="/poll/:id" component={SubmitVotePage} />
        <Route exact path="/poll/result/:id" component={PollResults} />
      </main>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
