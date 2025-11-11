import { Ledger } from "./managed/phq/contract/index.cjs";
import { WitnessContext } from "@midnight-ntwrk/compact-runtime";

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
