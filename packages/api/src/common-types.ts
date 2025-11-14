import { PHQ, type PHQPrivateState } from '@quick-starter/phq-contract';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type PHQCircuits = ImpureCircuitId<PHQ.Contract<PHQPrivateState>>;

export const PHQPrivateStateId = 'phqPrivateState';

export type PHQProviders = MidnightProviders<PHQCircuits, typeof PHQPrivateStateId, PHQPrivateState>;

export type PHQContract = PHQ.Contract<PHQPrivateState>;

export type DeployedPHQContract = DeployedContract<PHQContract> | FoundContract<PHQContract>;

