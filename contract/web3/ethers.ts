import { ethers } from "ethers";
import { abi, address as contractAddress } from '../abis/MyNFT.json';
import * as dotenv from 'dotenv';
import { uploadMetaData } from "../pinata/apis/upload.metadata";
dotenv.config({ path: '.env' });

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
const privateKey = process.env.PRIVATE_KEY || '';

export const checkNetworkInfo = async () => {
    return await provider.getNetwork();
};

export const getSigner = () => {
    return new ethers.Wallet(privateKey, provider);
};

export const getContract = () => {
    return new ethers.Contract(contractAddress, abi, getSigner());
};

export const mint = async () => {
    const recipient = getSigner().address;
    const tokenUri = await uploadMetaData();
    await getContract().mint(recipient, tokenUri);
};

mint();

// export const mint = async (recipient: string, _tokenURI: string) => {
//     return await getContract().mint(recipient, _tokenURI);
// };

// export const ownerOf = async (tokenId: number) => {
//     return await getContract().ownerOf(tokenId);
// };

// export const balanceOf = async (address: string) => {
//     return await getContract().balanceOf(address);
// };

// export const safeTransferFrom = async (
//     from: string,
//     to: string,
//     tokenId: number
// ) => {
//     return await getContract().safeTransferFrom(from, to, tokenId);
// };

// export const approve = async (to: string, tokenId: number) => {
//     return await getContract().approve(to, tokenId);
// };
