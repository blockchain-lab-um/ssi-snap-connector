import { MetaMaskSSISnap } from "./snap";
import {
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled,
} from "./utils";
const defaultSnapOrigin = "npm:@blockchain-lab-um/ssi-snap";

export { MetaMaskSSISnap } from "./snap";
export {
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled,
} from "./utils";

export type SnapInstallationParamNames = "version" | string;

/**
 * Install and enable Filecoin snap
 *
 * Checks for existence of Metamask and version compatibility with snaps before installation.
 *
 * Provided snap configuration must define at least network property so predefined configuration can be selected.
 * All other properties are optional, and if present will overwrite predefined property.
 *
 * @param snapOrigin
 *
 * @return MetamaskFilecoinSnap - adapter object that exposes snap API
 */
export async function enableSSISnap(
  snapOrigin?: string,
  snapInstallationParams: Record<SnapInstallationParamNames, unknown> = {}
): Promise<MetaMaskSSISnap> {
  const snapId = snapOrigin ?? defaultSnapOrigin;

  // check all conditions
  if (!hasMetaMask()) {
    throw new Error("Metamask is not installed");
  }
  if (!(await isMetamaskSnapsSupported())) {
    throw new Error("Current Metamask version doesn't support snaps");
  }

  const isInstalled = await isSnapInstalled(snapId);

  if (!isInstalled) {
    await window.ethereum.request({
      method: "wallet_enable",
      params: [
        {
          [`wallet_snap_${snapId}`]: {
            ...snapInstallationParams,
          },
        },
      ],
    });
  }

  // create snap describer
  const snap = new MetaMaskSSISnap(snapOrigin || defaultSnapOrigin);

  // return snap object
  return snap;
}
