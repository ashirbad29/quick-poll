import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Header from './components/layouts/Header';

function App() {
  return (
    <Router>
      <main className="flex flex-col min-h-screen">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
      </main>
    </Router>
  );
}

export default App;
