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

export const Checkup = () => {
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
        navbar={<></>}
        center={<DepressionCheckup />}
      /> 
    </>
  );

}

const DepressionCheckup = () => {
  return (
  <>
    <div className="place-items-center gap-4">
      <h2 className="text-xl">PATIENT HEALTH QUESTIONNAIRE-9 (PHQ-9)</h2>
      <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
      <Question qid="1" question={"Little interest or pleasure in doing things"}/>
      <Question qid="2" question="Feeling down, depressed, or hopeless" />
      <Question qid="2" question="Trouble falling or staying asleep, or sleeping too much" />
      <Question qid="4" question="Feeling tired or having little energy" />
      <Question qid="5" question="Poor appetite or overeating" />
      <Question qid="6" question="Feeling bad about yourself — or that you are a failure or have let yourself or your family down" />
      <Question qid="7" question="Trouble concentrating on things, such as reading the newspaper or watching television" />
      <Question qid="8" question="Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual" />
      <Question qid="9" question="Thoughts that you would be better off dead or of hurting yourself in some way" />
      <p><Link className="btn btn-primary"
              to={{
                pathname: "/user",
              }}
      >Submit</Link></p>

    </div>
  </>
  )
}

const Question = ({qid, question }) => {
  return (
  <>
<div className="w-full max-w-2xl mx-auto my-8">
    <label className="text-muted ">
        {qid}. {question}
    </label>
    <div className="flex flex-auto justify-evenly  rounded-md w-full my-2">
      <input type="radio" name={qid} className="radio" />
      <label className="cursor-pointer" for={question}>Not at all</label>
      <input type="radio" name={qid} className="radio" />
      <label className="cursor-pointer" for={question}>Several days</label>
      <input type="radio" name={qid} className="radio" />
      <label className="cursor-pointer" for={question}>More than half</label>
      <input type="radio" name={qid} className="radio" />
      <label className="cursor-pointer" for={question}>Nearly every day</label>
    </div>
    
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

