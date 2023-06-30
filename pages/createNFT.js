import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

const { create } = require("ipfs-http-client");

// TODO : to get projectId and Secret -> go to https://app.infura.io/dashboard -> Create new api key -> Choose IPFS Network -> now use the values
const projectId = "2KuvAYJu0kvpHCT4uV9xdtnuDaw";
const projectSecret = "eeab44c90ec60e9d02f9b9d7434a973b";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function CreateItem() {
  const [fileurl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received:${prog}`),
      });
      const url = `https://ipfs.infura.io:5001/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("error uploading file, please try again:", error);
    }
  }
}
