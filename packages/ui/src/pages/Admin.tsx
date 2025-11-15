import React, { useState, useEffect } from "react";
import Layout from "../components/Layout"
import WalletButton from "../components/WalletButton";
// import DeployButton from "../components/DeployButton";

import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
// import * as api from '@quick-starter/quick-starter-api';
// import { createPHQPrivateState, setPHQPrivateState } from '@quick-starter/phq-contract';
import * as contractModule from '../../../contract/src/managed/bboard/contract/index.cjs';
// const { createPHQPrivateState, setPHQPrivateState } = contractModule;
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';


export const Admin = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState('');

  const handleConnect = async () => {
    let isConnected = false;
    let address = null;
    try {
      const connectorAPI = await window.midnight?.mnLace.enable();

      const isEnabled = await window.midnight?.mnLace.isEnabled();
      if (isEnabled) {
        isConnected = true;
        console.log("Connected to the wallet:", connectorAPI);
        const state = await connectorAPI.state();
        address = state.address;
      }
    } catch (error) {
      console.log("An error occurred:", error.reason || error);
    }

    setIsConnected(isConnected);
    setWalletAddress(address);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setIsConnected(false);
  };

  // useEffect(() => {
  // }, []);

  const getProviders = async (walletAndMidnightProvider): Promise<PHQProviders> => {
    return {
      privateStateProvider: levelPrivateStateProvider<typeof PHQPrivateStateId>({
        privateStateStoreName:  'quick-starter-private-state',
      }),
      publicDataProvider: indexerPublicDataProvider('http://127.0.0.1:8088/api/v1/graphql', 'ws://127.0.0.1:8088/api/v1/graphql/ws'),
      zkConfigProvider: new FetchZkConfigProvider<'depressionCheckup'>(window.location.origin, fetch.bind(window)),
      proofProvider: httpClientProofProvider('http://127.0.0.1:6300'),
      walletProvider: walletAndMidnightProvider,
      midnightProvider: walletAndMidnightProvider,
    };
  };


  const handleDeploy = async () => {
    try {
      const wallet = await window.midnight?.mnLace;
      const providers = await getProviders(wallet);

      console.log("Api:", api);
      console.log("Providers:", providers);
    } catch (error) {
      console.log("An error occurred while deploy:", error.reason || error);
    }

    setContract("data.access_contract");
  };


//   const onDeploy: () => Promise<void> = async () => {
//     const provider = getProviders(window.midnight);
//     let d = await deploy(providers, createPHQPrivateState());
// deploy
//   };
  
  return (
      
    <>
      <Layout
        navbar={<WalletButton
          isConnected={isConnected}
          walletAddress={walletAddress}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />}
        // center={isConnected  ? <Dashboard /> : <DashboardLoading />}
        center={<DeployContract contract={contract} handleDeploy={handleDeploy} />}
      /> 
    </>
  );

}

const DeployContract = ({contract, handleDeploy}) => {
  return (
    <>
      <div className="flex w-full">
        <button className="btn" onClick={handleDeploy} >TBD: Deploy Contract</button>
      </div>
      <p>{contract}</p>
    </>
  )
}

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-4 gap-4 place-items-center ">
        <div className="col-span-3 col-start-2 place-items-center gap-4">
            <div className="radial-progress  m-8"
              style={{ "--value": "70", "--size": "12rem", "--thickness": "8px" } /* as React.CSSProperties */ } 
              aria-valuenow={70} role="progressbar">70%</div>
            <h2 className="text-2xl">Mental Score</h2>
        </div>
        
        <div className="col-span-2 row-start-2"><Rating rating={{ name: "Depression", level: 77, mask: "mask-star-2"}} /></div>
        <div className="col-span-2 col-start-4 row-start-2"><Rating rating={{ name: "Anxiety", level: 77, mask: "mask-heart"}} /></div>
        <div className="col-span-2 row-start-3"><Rating rating={{ name: "Somatic", level: 77, mask: "mask-star-2"}} /></div>
        <div className="col-span-2 col-start-4 row-start-3"><Rating rating={{ name: "Burnout", level: 77, mask: "mask-star-2"}} /></div>
        <div className="col-span-5 row-start-4"></div>
      </div>
    </>
  )
}

const DashboardLoading = () => {
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-4 gap-4 place-items-center ">
        <div className="col-span-3 col-start-2 place-items-center gap-4">
            <div className="skeleton radial-progress  m-8"
              style={{ "--value": "100", "--size": "12rem", "--thickness": "0px" } /* as React.CSSProperties */ } 
              aria-valuenow={70} role="progressbar"></div>
            <h2 className="text-2xl">Mental Score</h2>
        </div>
        
        <div className="col-span-2 row-start-2"><RatingLoading rating={{ name: "Depression", mask: "mask-star-2"}} /></div>
        <div className="col-span-2 col-start-4 row-start-2"><RatingLoading rating={{ name: "Anxiety", mask: "mask-heart"}} /></div>
        <div className="col-span-2 row-start-3"><RatingLoading rating={{ name: "Somatic", mask: "mask-star-2"}} /></div>
        <div className="col-span-2 col-start-4 row-start-3"><RatingLoading rating={{ name: "Burnout", mask: "mask-star-2"}} /></div>
        <div className="col-span-5 row-start-4"></div>
      </div>
    </>
  )
}


const Rating = ({rating}) => {
  return(
    <>
      <div className="place-items-center">
        <progress className="progress  w-76" value="70" max="100"></progress>
        <h2 className="text-xl">{rating.name}</h2>
      </div>
    </>
  )
}
  
const RatingLoading = ({rating}) => {
  return(
    <>
      <div className="place-items-center">
        <progress className="progress  w-76"></progress>
        <h2 className="text-xl">{rating.name}</h2>
      </div>
    </>
  )
}
  
