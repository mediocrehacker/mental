import React, { useState, useEffect } from "react";

import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import * as Rx from 'rxjs';
import {
  type BalancedTransaction,
  createBalancedTx,
  type FinalizedTxData,
  type MidnightProvider,
  type UnbalancedTransaction,
  type WalletProvider,
} from '@midnight-ntwrk/midnight-js-types';
import { type Wallet } from '@midnight-ntwrk/wallet-api';
import { Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { type CoinInfo, Transaction, type TransactionId } from '@midnight-ntwrk/ledger';
import { getLedgerNetworkId, getZswapNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { pipe as fnPipe } from 'fp-ts/function';
import { pino, type Logger } from 'pino';
// import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import Layout from "../components/Layout"
import WalletButton from "../components/WalletButton";
// import DeployButton from "../components/DeployButton";

import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { phqContractInstance ,type DeployedPHQContract, type PHQPrivateStateId, type PHQProviders, deploy, joinContract } from '@quick-starter/quick-starter-api';
import { type PHQPrivateState, createPHQPrivateState, witnesses } from '@quick-starter/phq-contract';
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

export const Admin = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState('');

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

  // const deploy_ = async (
  //   providers: PHQProviders,
  //   privateState: PHQPrivateState,
  // ): Promise<DeployedPHQContract> => {
  //   console.log(phqContractInstance);

  //   console.log("phqContractInstance");

  //   const phqContract = await deployContract(providers, {
  //     contract: phqContractInstance,
  //     privateStateId: 'phqPrivateState',
  //     initialPrivateState: privateState,
  //   });

  //   console.log(phqContract);

  //   return phqContract;
  // };

  const handleDeploy = async () => {
    try {
      const privateState: PHQPrivateState = createPHQPrivateState();
      const providers = await initializeProviders(logger)
      const addr = "0200274d3fa23083f93a6cc352ea5ef3eb084366bcabd6ab864e7ff2b93837c025c7"
      // const xxx = await providers?.privateStateProvider.get(privateState)
      // console.log(xxx);

      // const wallet = await window.midnight?.mnLace;
      // const providers = await getProviders(wallet);
      // console.log(providers);
      if (providers) {
        const deployedContract = await deploy(providers, privateState)
      }
      // const addr = "0200274d3fa23083f93a6cc352ea5ef3eb084366bcabd6ab864e7ff2b93837c025c7"
      // console.log("Address:", addr);
      // const contract = await joinContract(providers, addr)
      
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

export type ProviderCallbackAction =
  | 'downloadProverStarted'
  | 'downloadProverDone'
  | 'proveTxStarted'
  | 'proveTxDone'
  | 'balanceTxStarted'
  | 'balanceTxDone'
  | 'submitTxStarted'
  | 'submitTxDone'
  | 'watchForTxDataStarted'
  | 'watchForTxDataDone';


const setSnackBarText = (txt) => {
  console.log(txt);
}
  
const providerCallback: (action: ProviderCallbackAction) => void = (action: ProviderCallbackAction): void => {
    if (action === 'proveTxStarted') {
      setSnackBarText('Proving transaction...');
    } else if (action === 'proveTxDone') {
      setSnackBarText(undefined);
    } else if (action === 'balanceTxStarted') {
      setSnackBarText('Signing the transaction with Midnight Lace wallet...');
    } else if (action === 'downloadProverDone') {
      setSnackBarText(undefined);
    } else if (action === 'downloadProverStarted') {
      setSnackBarText('Downloading prover key...');
    } else if (action === 'balanceTxDone') {
      setSnackBarText(undefined);
    } else if (action === 'submitTxStarted') {
      setSnackBarText('Submitting transaction...');
    } else if (action === 'submitTxDone') {
      setSnackBarText(undefined);
    } else if (action === 'watchForTxDataStarted') {
      setSnackBarText('Waiting for transaction finalization on blockchain...');
    } else if (action === 'watchForTxDataDone') {
      setSnackBarText(undefined);
    }
  };

/** @internal */
const initializeProviders = async (logger: Logger): Promise<PHQProviders | null> => {
  const uris = await window.midnight?.mnLace.serviceUriConfig();
  const wallet = await window.midnight?.mnLace.enable();

  // const zkConfigPath = window.location.origin; // '../../../contract/src/managed/bboard';

      console.log(`Connecting to wallet with network ID: ${getLedgerNetworkId()}`);
      console.log(`Connecting to wallet with network ID: ${getLedgerNetworkId()}`);
      console.log(`Connecting to wallet with network ID: ${NetworkId.Undeployed}`);
      console.log(`Connecting to wallet with network ID: ${NetworkId.TestNet}`);

      console.log(uris);

  if (!uris || !wallet) {
    return null;
  }

  const walletState = await wallet.state();
  const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  
  return {
    // privateStateProvider: levelPrivateStateProvider({
    //   privateStateStoreName: 'PHQPrivateState',
    // }),
    privateStateProvider: levelPrivateStateProvider<typeof PHQPrivateStateId>({
      privateStateStoreName: 'quick-starter-private-state',
      // privateStateStoreName: contractConfig.privateStateStoreName,
    }),
    zkConfigProvider: new FetchZkConfigProvider<'depressionCheckup'>(window.location.origin, fetch.bind(window)),
    // zkConfigProvider: new FetchZkConfigProvider<BBoardCircuitKeys>(zkConfigPath, fetch.bind(window)),
    proofProvider: httpClientProofProvider(uris.proverServerUri),
    publicDataProvider: indexerPublicDataProvider(uris.indexerUri, uris.indexerWsUri),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
    // walletProvider: {
    //   coinPublicKey: walletState.coinPublicKey,
    //   encryptionPublicKey: walletState.encryptionPublicKey,
    //   balanceTx(tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction> {
    //     return wallet
    //       .balanceAndProveTransaction(
    //         ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
    //         newCoins,
    //       )
    //       .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
    //       .then(createBalancedTx);
    //   },
    // },
    // midnightProvider: {
    //   submitTx(tx: BalancedTransaction): Promise<TransactionId> {
    //       providerCallback('submitTxStarted');
    //       return wallet.submitTransaction(tx).finally(() => {
    //         providerCallback('submitTxDone');
    //       });
    //   },
    // },
  };
};

export const createWalletAndMidnightProvider = async (wallet: any): Promise<WalletProvider & MidnightProvider> => {
  const state = await wallet.state();
  return {
    coinPublicKey: state.coinPublicKey,
    encryptionPublicKey: state.encryptionPublicKey,
    balanceTx(tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction> {
      return wallet
        .balanceTransaction(
          ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
          newCoins,
        )
        .then((tx) => wallet.proveTransaction(tx))
        .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
        .then(createBalancedTx);
    },
    submitTx(tx: BalancedTransaction): Promise<TransactionId> {
      return wallet.submitTransaction(tx);
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

