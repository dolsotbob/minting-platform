import { jwt } from '../pinata.config';
import axios from 'axios';
import { uploadFileToIPFS } from './upload.file';

export const uploadMetaData = async () => {
    // const imgeURL = await uploadFileToIPFS();

    const metadata = {
        name: '봄',
        description: '봄 꽃',
        image: 'https://plum-acceptable-gorilla-851.mypinata.cloud/ipfs/bafkreidick7rvsz6kk3azj7q522pm6tinakcczna4hxl3wxpnxvnrj5nd4',
        attributes: [
            { trait_type: 'Rarity', value: 'Legendary' },
            { trait_type: 'Warmth', value: 80 },
        ],
    };
    console.log('Metadata: ', metadata);

    const data = JSON.stringify({
        pinataMetadata: {
            name: metadata.name,
        },
        pinataContent: metadata,
    });

    try {
        const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            data,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const tokenUri = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        console.log('\n메타데이터를 IPFS에 업로드합니다.');
        console.log('Metadata CID:', response.data.IpfsHash);
        console.log('Token URI:', tokenUri);
        return tokenUri;
    } catch (error: any) {
        console.error(error);
    }
}