import { Contract, type PHQPrivateState } from '@quick-starter/phq-contract';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type PHQCircuits = ImpureCircuitId<Contract<PHQPrivateState>>;

export const PHQPrivateStateId = 'phqPrivateState';

export type PHQProviders = MidnightProviders<PHQCircuits, typeof PHQPrivateStateId, PHQPrivateState>;

export type PHQContract = Contract<PHQPrivateState>;

export type DeployedPHQContract = DeployedContract<PHQContract> | FoundContract<PHQContract>;

