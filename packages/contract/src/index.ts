import { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import type { Contract as ContractType, Ledger, Witnesses } from './managed/phq/contract/index.cjs';
import ContractModule from './managed/phq/contract/index.cjs';

export * from './managed/phq/contract/index.cjs';

export const ledger = ContractModule.ledger;
export const pureCircuits = ContractModule.pureCircuits;
export const { Contract } = ContractModule;
export type Contract<T, W extends Witnesses<T> = Witnesses<T>> = ContractType<T, W>;


// This is how we type an empty object.
export type PHQPrivateState = {
  depressionLevel: bigint;
};

export const createPHQPrivateState = () => ({
  depressionLevel: 0n
});

export const setPHQPrivateState = (level: bigint) => ({
  depressionLevel: level
});

export const witnesses = {
  averageLevelDepression: ({
    privateState,
    ledger,
  }: WitnessContext<Ledger, PHQPrivateState>): [
    PHQPrivateState,
    bigint,
  ] => {
    if (ledger.depressionLevel > 0) {
      const avg = (privateState.depressionLevel + ledger.depressionLevel) / 2n;
      return [privateState, avg ]
    } else {
      return [privateState, privateState.depressionLevel ]
    }
  },
};


// export * as PHQ from "./managed/phq/contract/index.cjs";
// export * from "./witnesses";

