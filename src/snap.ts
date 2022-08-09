import { SSISnapApi } from "@blockchain-lab-um/ssi-snap-types";
import {
  saveVC,
  getVCs,
  getVP,
  togglePopups,
  changeInfuraToken,
} from "./methods";

export class MetaMaskSSISnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;

  public constructor(snapOrigin: string) {
    this.snapOrigin = snapOrigin;
    this.snapId = `wallet_snap_${this.snapOrigin}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public getSSISnapApi = async (): Promise<SSISnapApi> => {
    return {
      saveVC: saveVC.bind(this),
      getVCs: getVCs.bind(this),
      getVP: getVP.bind(this),
      togglePopups: togglePopups.bind(this),
      changeInfuraToken: changeInfuraToken.bind(this),
    };
  };
}
