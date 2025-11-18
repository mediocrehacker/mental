import React, { useState, useEffect } from "react";

import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { Link } from "react-router";
import { getLedgerNetworkId, getZswapNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { pipe as fnPipe } from 'fp-ts/function';
import { pino, type Logger } from 'pino';
// import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import Layout from "../components/Layout"
import WalletButton from "../components/WalletButton";
// import DeployButton from "../components/DeployButton";

import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { deploy, joinContract } from '@quick-starter/quick-starter-api';
import { type PHQPrivateState, createPHQPrivateState, witnesses, setPHQPrivateState } from '@quick-starter/phq-contract';
// import * as contractModule from '../../../contract/src/managed/bboard/contract/index.cjs';
// const { createPHQPrivateState, setPHQPrivateState } = contractModule;
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import {
  type DAppConnectorAPI,
  type DAppConnectorWalletAPI,
  type ServiceUriConfig,
} from '@midnight-ntwrk/dapp-connector-api';

export const User = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState('');
  const [depression, setDepression] = useState(0);

  const logger = pino({
    browser: {
      serialize: true,
      asObject: true,
    },
  });

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

  // const phqContractInstance: PHQContract = new PHQ.default.Contract(witnesses);
  // const privateState: PHQPrivateState = createPHQPrivateState();

  // const deploy = async (
  //   providers: PHQProviders,
  //   privateState: PHQPrivateState,
  // ): Promise<DeployedPHQContract> => {
  //   const phqContract = await deployContract(providers, {
  //     contract: phqContractInstance,
  //     privateStateId: 'phqPrivateState',
  //     initialPrivateState: privateState,
  //   });
  //   return phqContract;
  // };

  const handleDeploy = async () => {
    try {
      const privateState: PHQPrivateState = createPHQPrivateState();
      const providers = await initializeProviders(logger)
      // const wallet = await window.midnight?.mnLace;
      // const providers = await getProviders(wallet);
      const deployedContract = await deploy(providers, privateState)
      // const addr = "0200274d3fa23083f93a6cc352ea5ef3eb084366bcabd6ab864e7ff2b93837c025c7"
      // console.log("Address:", addr);
      // const contract = await joinContract(providers, addr)
      
      console.log("Providers:", providers);
    } catch (error) {
      console.log("An error occurred while deploy:", error.reason || error);
    }

    // for demo purpose:
    setContract("0200274d3fa23083f93a6cc352ea5ef3eb084366bcabd6ab864e7ff2b93837c025c7");
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
        center={<Dashboard contract={contract} handleDeploy={handleDeploy} depression={depression} setDepression={setDepression} />}

      /> 
    </>
  );
}

const DeployContract = ({contract, handleDeploy}) => {
  return (
    <>
      <div className="flex">
        <button className="btn btn-link" onClick={handleDeploy} >Deploy Contract</button>
      </div>
    </>
  )
}

const Dashboard = ({contract, handleDeploy, depression, setDepression}) => {
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-4 gap-4 place-items-center ">
        <div className="col-span-3 col-start-2 place-items-center gap-4">
            <div className="radial-progress  m-8"
              style={{ "--value": `${depression}`, "--size": "12rem", "--thickness": "8px" } /* as React.CSSProperties */ } 
              aria-valuenow={0} role="progressbar">{depression}</div>
            <div className="flex flex-col"><h2 className="text-2xl" onClick={() => setDepression(88)}>Mental Score</h2>
            </div>
        </div>

        <div className="col-span-2 row-start-2">
          <Rating rating={{ name: "Depression", level: `${depression}`, mask: "mask-star-2"}} />
        </div>
        <div className="col-span-2 col-start-4 row-start-2"><Rating rating={{ name: "Anxiety", level: 0, mask: "mask-heart"}} />
</div>
        <div className="col-span-2 row-start-3"><Rating rating={{ name: "Somatic", level: 0, mask: "mask-star-2"}} />
</div>
        <div className="col-span-2 col-start-4 row-start-3"><Rating rating={{ name: "Burnout", level: 0, mask: "mask-star-2"}} />
</div>
        <div className="col-span-5 row-start-4">
          <div className="flex gap-4 w-full">
          <input type="text" placeholder="neutral" className="input w-96" />
            <Link className="btn"
              to={{
                pathname: "/checkup",
              }}
            >Join Contract</Link>
          </div>

        </div>
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
        <progress className="progress  w-76" value={rating.level} max="100"></progress>
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

/** @internal */
const initializeProviders = async (logger: Logger): Promise<BBoardProviders> => {
  const uris = await window.midnight?.mnLace.serviceUriConfig();
  const wallet = await window.midnight?.mnLace.enable();

  const walletState = await wallet.state();
  // const zkConfigPath = window.location.origin; // '../../../contract/src/managed/bboard';

      console.log(`Connecting to wallet with network ID: ${getLedgerNetworkId()}`);
      console.log(`Connecting to wallet with network ID: ${getLedgerNetworkId()}`);
      console.log(`Connecting to wallet with network ID: ${NetworkId.Undeployed}`);
      console.log(`Connecting to wallet with network ID: ${NetworkId.TestNet}`);


  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: 'quick-starter-private-state',
    }),
    zkConfigProvider: new FetchZkConfigProvider<'depressionCheckup'>(window.location.origin, fetch.bind(window)),
    // zkConfigProvider: new FetchZkConfigProvider<BBoardCircuitKeys>(zkConfigPath, fetch.bind(window)),
    proofProvider: httpClientProofProvider(uris.proverServerUri),
    publicDataProvider: indexerPublicDataProvider(uris.indexerUri, uris.indexerWsUri),
    walletProvider: {
      coinPublicKey: walletState.coinPublicKey,
      encryptionPublicKey: walletState.encryptionPublicKey,
      balanceTx(tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction> {
        return wallet
          .balanceAndProveTransaction(
            ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
            newCoins,
          )
          .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
          .then(createBalancedTx);
      },
    },
    midnightProvider: {
      submitTx(tx: BalancedTransaction): Promise<TransactionId> {
        return wallet.submitTransaction(tx);
      },
    },
  };
};

/** @internal */
// const connectToWallet = (logger: Logger): Promise<{ wallet: DAppConnectorWalletAPI; uris: ServiceUriConfig }> => {

//   const uris = window.midnight?.mnLace.serviceUriConfig();
//   const wallet = window.midnight?.mnLace.enable();
  
//   return { wallet , uris };
// };


  // const getProviders = async (walletAndMidnightProvider): Promise<PHQProviders> => {
  //   console.log(walletAndMidnightProvider);
  //   return {
  //     privateStateProvider: levelPrivateStateProvider<typeof PHQPrivateStateId>({
  //       privateStateStoreName:  'quick-starter-private-state',
  //     }),
  //     publicDataProvider: indexerPublicDataProvider('http://127.0.0.1:8088/api/v1/graphql', 'ws://127.0.0.1:8088/api/v1/graphql/ws'),
  //     zkConfigProvider: new FetchZkConfigProvider<'depressionCheckup'>(window.location.origin, fetch.bind(window)),
  //     proofProvider: httpClientProofProvider('http://127.0.0.1:6300'),
  //     walletProvider: walletAndMidnightProvider,
  //     midnightProvider: walletAndMidnightProvider,
  //   };
  // };

