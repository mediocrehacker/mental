import React, { useState } from "react";
import Layout from "../components/Layout"
import WalletButton from "../components/WalletButton";

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

  return (
      
    <>
      <Layout
        navbar={<WalletButton
          isConnected={isConnected}
          walletAddress={walletAddress}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />}
        center={<Dashboard />}
      /> 
    </>
  );

}

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-4 gap-4 place-items-center">
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
  
