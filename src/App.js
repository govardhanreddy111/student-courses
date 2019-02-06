import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './components/header/HeaderComponent'
import MainTabs from './components/MainTabs/MainTabs';


class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />
            <MainTabs/>
      </div>
    );
  }
}

export default App;
