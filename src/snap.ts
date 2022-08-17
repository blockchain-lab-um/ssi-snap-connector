import { SSISnapApi } from "@blockchain-lab-um/ssi-snap-types";
import {
  saveVC,
  getVCs,
  getVP,
  togglePopups,
  changeInfuraToken,
  init,
  getDID,
  getMethod,
  getAvailableMethods,
  switchMethod,
} from "./methods";

export class MetaMaskSSISnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;
  public readonly supportedMethods: string[];

  public constructor(snapOrigin: string, supportedMethods: string[]) {
    this.snapOrigin = snapOrigin;
    this.snapId = `wallet_snap_${this.snapOrigin}`;
    this.supportedMethods = supportedMethods;

    window.ethereum.on("accountsChanged", this.accountChanged);
  }

  public accountChanged = async (accounts: string[]) => {
    console.log("Account changed", accounts[0]);
    const api = await this.getSSISnapApi();
    await api.init();
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  public getSSISnapApi = async (): Promise<SSISnapApi> => {
    return {
      saveVC: saveVC.bind(this),
      getVCs: getVCs.bind(this),
      getVP: getVP.bind(this),
      togglePopups: togglePopups.bind(this),
      changeInfuraToken: changeInfuraToken.bind(this),
      init: init.bind(this),
      getDID: getDID.bind(this),
      getMethod: getMethod.bind(this),
      getAvailableMethods: getAvailableMethods.bind(this),
      switchMethod: switchMethod.bind(this),
    };
  };
}
