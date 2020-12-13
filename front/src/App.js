import React from 'react';
import './App.css';
import MainPage from "./containers/MainPage";

function App (){

    const UserName = 'Dima';

    return (
        <div className='App'>
          <MainPage userName={UserName}/>
        </div>
    );
}

export default App;
