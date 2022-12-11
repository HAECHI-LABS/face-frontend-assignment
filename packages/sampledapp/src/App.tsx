import React, {useState, useEffect} from "react";
import './App.css';
import {FaceSDK} from "@face/sdk";

function App() {
  const [sdk] = useState(new FaceSDK());

  async function clickCreateWallet() {
    const address = await sdk.createWallet();
    console.log(address);
  }

  async function clickSendTransaction() {
    // todo: amount는 input 창에서 받도록 수정 @steve
    const amount = "0.01";
    const transactionHash = await sdk.sendTransaction(amount);
    console.log(transactionHash);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: "flex", padding: "10px"}}>
          <button style={{margin: "10px", padding: "7px"}} onClick={clickCreateWallet}> SignUp/SignIn</button>
          <button style={{margin: "10px", padding: "7px"}} onClick={clickSendTransaction}> SendTransaction</button>
        </div>
      </header>
    </div>
  );
}

export default App;
