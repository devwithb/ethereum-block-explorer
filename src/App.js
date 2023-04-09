import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transaction, setTransaction] = useState([]);
  const [addressTo, setAddressTo] = useState("");
  const [addressFrom, setAddressFrom] = useState("");
  const [gasUsed, setGasUsed] = useState();

  useEffect(() => {
    getBlockNumber();
  }, []);

  async function getBlockNumber() {
    const block = await alchemy.core.getBlockNumber();
    setBlockNumber(block);
    getTransaction(block);
  }
  
  async function getTransaction(blockNumber) {
    const block = await alchemy.core.getBlockWithTransactions(blockNumber);
    const txn = block.transactions[2];
    // console.log(typeof txn)
    // console.log(txn);
    const txnHash = txn.hash.toString();
    setTransaction(txnHash);
    // console.log(typeof txnHash)
    // console.log(txnHash)
    let response = await alchemy.core.getTransactionReceipt(txnHash);
    console.log(response)
    setAddressTo(response.to);
    setAddressFrom(response.from);
    setGasUsed(response.gasUsed.toString());

  }

  return (
    <>
      <div className="App">
        <div>Block Number: {blockNumber}</div>
        <div>Transaction Hash: {transaction}</div>
        <div>From: {addressFrom}</div>
        <div>To: {addressTo}</div>
        <div>Gas Used: {gasUsed}</div>
      </div>
    </>
  );
}

export default App;
