import Web3 from 'web3';
import ABI from './ABI.json'; // Import your contract ABI here
import type { MetaMaskInpageProvider } from '@metamask/providers';

type LinkType = {
  fee: string,
  url?: string,
}

const CONTRACT_ADDRESS = '0x70A7677D58472A04bD703C5BB61bcDE0aA3102c3'; // Replace with your contract address
// import detectEthereumProvider from '@metamask/detect-provider';

// async function connectContractAlt() {
//   try {
//     const provider = await detectEthereumProvider();
//     if (provider) {
//       const web3 = new Web3(provider as any);
//       const accounts = await web3.eth.requestAccounts();
//       if (accounts.length > 0) {
//         console.log('Connected account:', accounts[0]);
//         return web3;
//       } else {
//         console.error('No accounts found');
//       }
//     } else {
//       console.error('Please install MetaMask!');
//     }
//   } catch (error) {
//     console.error('Error connecting to contract:', error);
//   }
//   return null;
// }


declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export async function connectContract() {
  if (!window.ethereum) {
    console.error('MetaMask is not installed');
    return null;
  }

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if(!accounts || accounts.length === 0) throw new Error('No accounts found');

  // alert(`Connected account: ${accounts[0]}`);
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
    from: accounts[0]
  });
}

export async function createLink(url: string, linkId: string, feeInWei: number) {
  const contract = await connectContract();
  return contract?.methods.addLink(url, linkId, feeInWei).send(); 
}

export async function getLink(linkId: string): Promise<LinkType | undefined> {
  const contract = await connectContract();
  return contract?.methods.getLink(linkId).call(); 
}

export async function payLink(linkId: string, weiValue: string): Promise<void> {
  const contract = await connectContract();
  await contract?.methods.payLink(linkId).send({
    value: weiValue
  }); 
}