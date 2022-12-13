import React, { useState } from 'react';
import './App.css';
import { FaceSDK } from '@face/sdk';

function App() {
  const [sdk] = useState(new FaceSDK());

  async function clickCreateWallet() {
    const address = await sdk.createWallet();
    console.log(address);
  }

  async function clickSendTransaction() {
    // todo: amount는 input 창에서 받도록 수정 @steve
    const amount = '0.01';
    const transactionHash = await sdk.sendTransaction(amount);
    console.log(transactionHash);
  }

  return (
    <div className="App">
      <div className="box">
        <button className="btn" onClick={clickCreateWallet}>
          SignUp/SignIn
        </button>
      </div>
      <div className="box">
        <div className="label">Amount</div>
        <div className="input-wrapper">
          <input type="number" className="input-text" placeholder="0.00" />
        </div>
        <button className="btn" onClick={clickSendTransaction} disabled>
          SendTransaction
        </button>
      </div>
    </div>
  );
}

export default App;
