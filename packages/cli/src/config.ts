import path from 'node:path';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { QuickStarterPrivateStateId } from './api';

export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');

export const contractConfig = {
  privateStateStoreName: 'quick-starter-private-state',
  zkConfigPath: path.resolve(currentDir, '..', '..', 'contract', 'src', 'managed', 'phq'),
};


export interface Config {
  // readonly privateStateStoreName: string;
  readonly logDir: string;
  readonly zkConfigPath: string;
  readonly indexer: string;
  readonly indexerWS: string;
  readonly node: string;
  readonly proofServer: string;

  setNetworkId: () => void;
}


export class StandaloneConfig implements Config {
  // privateStateStoreName = QuickStarterPrivateStateId
  logDir = path.resolve(currentDir, '..', 'logs', 'standalone', `${new Date().toISOString()}.log`);
    zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'dist', 'managed', 'phq');
  indexer = 'http://127.0.0.1:8088/api/v1/graphql';
  indexerWS = 'ws://127.0.0.1:8088/api/v1/graphql/ws';
  node = 'http://127.0.0.1:9944';
  proofServer = 'http://127.0.0.1:6300';

  setNetworkId() {
    setNetworkId(NetworkId.Undeployed);
  }
}

export class TestnetRemoteConfig implements Config {
  // privateStateStoreName = QuickStarterPrivateStateId
  logDir = path.resolve(currentDir, '..', 'logs', 'testnet-remote', `${new Date().toISOString()}.log`);
    zkConfigPath = path.resolve(currentDir, '..', '..', 'contract', 'dist', 'managed', 'phq');
  indexer = 'https://indexer.testnet-02.midnight.network/api/v1/graphql';
  indexerWS = 'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws';
  node = 'https://rpc.testnet-02.midnight.network';
  // proofServer = 'https://lace-dev.proof-pub.stg.midnight.tools';
  proofServer = 'http://127.0.0.1:6300';


  setNetworkId() {
    setNetworkId(NetworkId.TestNet);
  }
}
