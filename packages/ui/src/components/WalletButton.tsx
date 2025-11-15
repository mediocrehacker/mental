import React from "react";
import type { WalletCardProps } from "./types";

const shortenAddress = (address, start = 18, end = 8) => {
  if (address.length <= start + end) return address;
  return `${address.substring(0, start)}...${address.substring(address.length - end)}`;
}

const WalletButton: React.FC<WalletCardProps> = ({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="">
      {isConnected ? (
        <div className="flex flex-row gap-8 place-items-center">
          <span className="text" title={walletAddress}>{shortenAddress(walletAddress)}</span>

          <button
            className="btn btn-neutral w-42"
            onClick={onDisconnect}
          >
             Disconnect Wallet

          </button>
        </div>
      ) : (
        <div className="flex flex-row gap-8 place-items-center">
          <span className="text"></span>

          <button
            onClick={onConnect}
            className="btn btn-primary w-42"
          >
           Connect Wallet
        </button>
        </div>
      )}
    </div>
  );
};

export default WalletButton;
