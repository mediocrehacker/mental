import React, { useState } from "react";
import Layout from "../components/Layout"
import WalletButton from "../components/WalletButton";
import * as api from '@quick-starter/quick-starter-api';

export const Admin = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

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

  const onDeploy: () => Promise<void> = async () => {
    // const contract: IdentityRegistryContract = new Contract({});

    // if (midnightWallet.walletAPI) {
    //   const midnightProviders = providers(
    //     midnightWallet.publicDataProvider,
    //     midnightWallet.walletProvider,
    //     midnightWallet.midnightProvider,
    //     midnightWallet.walletAPI,
    //     midnightWallet.callback,
    //   );
    //   await midnightProviders.privateStateProvider.set('coin', {});
    //   const deployedContract: DeployedIdentityRegistry = await deployContract(midnightProviders, {
    //     privateStateKey: 'coin',
    //     contract,
    //     initialPrivateState: {},
    //   });

    //   logger.info('deployed at', deployedContract.deployTxData.public.contractAddress);
    // }
    
  };
  
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
        center={<DeployContract />}
      /> 
    </>
  );

}

const DeployContract = () => {
  return (
    <>
      <div className="flex w-full">
        <button className="btn">TBD: Deploy Contract</button>
      </div>
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
  
