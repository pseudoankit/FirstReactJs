import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import web3Modal from "web3modal";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    const provider = new ethers.providers.JsonRpcProvider();
    const nftContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const nftMarketContract = new ethers.Contract(
      nftMarketAddress,
      NFTMarket.abi,
      provider
    );
    const data = await nftMarketContract.fetchMarketItems()

    const items = await Promise.all(
      data.map(async (it) => {
        const tokenUri = await nftContract.tokenURI(it.tokenId);
        const meta = axios.get(tokenUri);
        let price = ethers.utils.formatUnits(it.price.toString, "ether");

        let item = {
          price: price,
          tokenId: it.tokenId.toNumber(),
          seller: it.seller,
          owner: it.owner,
          image: meta.data.image,
          name: meta.data.image,
          description: meta.data.description,
        };
        console.log(meta);
        return item;
      })
    );

    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNFT(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      nftMarketAddress,
      NFTMarket.abi,
      signer
    );
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftAddress,
      nft.tokenId,
      { value: price }
    );
    await transaction.await();
    loadNfts();
  }

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div>
        <p className="px-10 py-10 text-2xl font-bold justify-center text-cyan-200">
          There are currently no NFTs in the Marketplace.
          <br /> Please come back later
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-4 gap-5 pt-5">
          {nfts.map((nft, index) => {
            // todo with (
            <div
              key={index}
              className="border shadow rounded-3xl overflow-hidden"
            >
              <img src={nft.image} />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-2xl"
                  font-semibold
                >
                  {nft.name}
                </p>
                <div style={{ height: "70px", overflow: "hidden" }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>

              <div className="p-4 bg-blue">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button
                  className="w-full bg-purple-600 text-white font-bold py-2 px-12 rounded"
                  onClick={() => buyNFT(nft)}
                >
                  Buy
                </button>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  )
}
