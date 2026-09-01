import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import {
  getFallbackProvider,
  getWalletProvider,
  getContractRead,
  getContractWrite,
  CONTRACT_ADDRESS,
  CHAIN_ID,
  RPC_URL,
  NETWORK_NAME,
} from "../config/contract";

const StateContext = createContext();

// Sample curated leisure causes for instant lively showcase
export const SAMPLE_CAMPAIGNS = [
  {
    pId: 9901,
    owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    title: "Solar Water Wells for Rural Communities",
    description: "Bringing sustainable clean water and solar-powered extraction wells to over 12 rural villages facing severe drought. 100% of donations are deployed directly into hardware and drilling logistics.",
    target: "15.0",
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 18, // 18 days from now
    amountCollected: "8.45",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&auto=format&fit=crop&q=80",
    category: "Emergency Relief",
    donators: [
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
    ],
    donations: ["3.0", "4.2", "1.25"],
    isSample: true,
  },
  {
    pId: 9902,
    owner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    title: "Amazon Canopy Reforestation & Wildlife Shield",
    description: "Restoring native biodiversity corridors in damaged rainforest zones. We plant verified native tree species and deploy acoustic sensors to protect wildlife from illegal poaching.",
    target: "25.0",
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 34, // 34 days
    amountCollected: "19.8",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&auto=format&fit=crop&q=80",
    category: "Environment & Nature",
    donators: [
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"
    ],
    donations: ["10.0", "9.8"],
    isSample: true,
  },
  {
    pId: 9903,
    owner: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    title: "Emergency Pediatric Heart Surgery Fund",
    description: "Subsidizing life-saving cardiovascular surgeries and post-operative recovery medicines for underprivileged children diagnosed with congenital heart defects.",
    target: "30.0",
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 6, // 6 days (urgent)
    amountCollected: "26.4",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80",
    category: "Healthcare & Medicine",
    donators: [
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    ],
    donations: ["15.0", "11.4"],
    isSample: true,
  },
  {
    pId: 9904,
    owner: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    title: "STEM Coding & Robotics Lab for Underfunded Schools",
    description: "Equipping 50 public high schools with laptops, robotics maker kits, and interactive AI curriculum for next-generation young engineers.",
    target: "12.0",
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 45,
    amountCollected: "5.1",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
    category: "Education & Youth",
    donators: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
    donations: ["5.1"],
    isSample: true,
  },
  {
    pId: 9905,
    owner: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    title: "Coastal Animal Sanctuary & Marine Rescue Unit",
    description: "Building an ocean-side rehabilitation facility for rescued seals, sea turtles, and coastal birds injured by marine plastic debris.",
    target: "8.0",
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 12,
    amountCollected: "3.75",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1200&auto=format&fit=crop&q=80",
    category: "Animal Rescue",
    donators: ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"],
    donations: ["3.75"],
    isSample: true,
  },
];

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState("0.00");
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("auragiving_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [toasts, setToasts] = useState([]);
  const [quickDonateCampaign, setQuickDonateCampaign] = useState(null);

  const provider = useMemo(() => getFallbackProvider(), []);

  // Toast notification helper
  const showToast = useCallback((message, type = "info", txHash = null) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, txHash }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toggle Bookmark
  const toggleBookmark = useCallback((pId) => {
    setBookmarks((prev) => {
      let updated;
      if (prev.includes(pId)) {
        updated = prev.filter((id) => id !== pId);
        showToast("Removed from saved causes", "info");
      } else {
        updated = [...prev, pId];
        showToast("Added to saved causes ❤️", "success");
      }
      try {
        localStorage.setItem("auragiving_bookmarks", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, [showToast]);

  // Fetch ETH Balance
  const fetchBalance = useCallback(async (userAddress) => {
    if (!userAddress) return;
    try {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const bal = await web3Provider.getBalance(userAddress);
        setBalance(parseFloat(ethers.utils.formatEther(bal)).toFixed(3));
      } else {
        const bal = await provider.getBalance(userAddress);
        setBalance(parseFloat(ethers.utils.formatEther(bal)).toFixed(3));
      }
    } catch (err) {
      console.warn("Could not fetch balance:", err);
    }
  }, [provider]);

  // Connect Wallet
  const connectWallet = useCallback(async () => {
    const ethereum = window.ethereum;
    if (!ethereum) {
      showToast("MetaMask not found. Please install MetaMask to interact on-chain.", "error");
      return;
    }
    setIsConnecting(true);
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      if (accounts && accounts[0]) {
        setAddress(accounts[0]);
        await fetchBalance(accounts[0]);
        const currentChain = await ethereum.request({ method: "eth_chainId" });
        setChainId(parseInt(currentChain, 16));
        showToast(`Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`, "success");
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
      showToast(error?.message || "Failed to connect wallet", "error");
    } finally {
      setIsConnecting(false);
    }
  }, [fetchBalance, showToast]);

  // Switch / Add Hardhat Local Network
  const switchNetwork = useCallback(async (targetChainId = CHAIN_ID) => {
    const ethereum = window.ethereum;
    if (!ethereum) return;
    const hexChainId = "0x" + targetChainId.toString(16);
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }],
      });
    } catch (switchError) {
      // If chain not added to MetaMask (4902), add it
      if (switchError.code === 4902 || switchError.message?.includes("Unrecognized chain ID")) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: hexChainId,
                chainName: NETWORK_NAME,
                rpcUrls: [RPC_URL],
                nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add network:", addError);
          showToast("Failed to add network to MetaMask", "error");
        }
      }
    }
  }, [showToast]);

  // Listen to account & chain changes
  useEffect(() => {
    const ethereum = window.ethereum;
    if (!ethereum) return undefined;

    const handleAccountsChanged = (accounts) => {
      if (!accounts || accounts.length === 0) {
        setAddress(null);
        setBalance("0.00");
      } else {
        setAddress(accounts[0]);
        fetchBalance(accounts[0]);
      }
    };

    const handleChainChanged = (newChainId) => {
      setChainId(parseInt(newChainId, 16));
    };

    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    // Initial check if already connected
    ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        fetchBalance(accounts[0]);
      }
    }).catch(console.error);

    ethereum.request({ method: "eth_chainId" }).then((currentChain) => {
      setChainId(parseInt(currentChain, 16));
    }).catch(console.error);

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [fetchBalance]);

  // Contract instance
  const contract = useMemo(() => {
    if (address && window.ethereum) {
      const walletProvider = getWalletProvider();
      return getContractWrite(walletProvider.getSigner(address));
    }
    return getContractRead(provider);
  }, [address, provider]);

  // Create Campaign
  const createCampaign = async (form) => {
    if (!contract) throw new Error("Contract object is undefined");
    if (!address) throw new Error("Please connect your wallet first");

    const target = ethers.BigNumber.isBigNumber(form.target)
      ? form.target
      : ethers.utils.parseEther(form.target.toString());

    const deadlineTimestamp = new Date(form.deadline).getTime();

    showToast("Submitting transaction to blockchain...", "info");

    const tx = await contract.createCampaign(
      address,
      form.title,
      form.description,
      target,
      deadlineTimestamp,
      form.image
    );

    await tx.wait();
    showToast("Campaign launched successfully on-chain! 🎉", "success", tx.hash);
    await fetchBalance(address);
    return tx;
  };

  // Get All Campaigns
  const getCampaigns = async () => {
    try {
      const onChainData = await contract.getCampaigns();

      const parsedCampaigns = onChainData
        .map((campaign, i) => {
          // If deleted campaign or zero target
          if (!campaign.owner || campaign.owner === ethers.constants.AddressZero || campaign.target.toString() === "0") {
            return null;
          }

          // Deduce category or default
          let category = "Community";
          const desc = (campaign.description + " " + campaign.title).toLowerCase();
          if (desc.includes("water") || desc.includes("relief") || desc.includes("emergency") || desc.includes("flood") || desc.includes("crisis")) {
            category = "Emergency Relief";
          } else if (desc.includes("tree") || desc.includes("nature") || desc.includes("climate") || desc.includes("amazon") || desc.includes("solar") || desc.includes("green")) {
            category = "Environment & Nature";
          } else if (desc.includes("health") || desc.includes("medical") || desc.includes("surgery") || desc.includes("hospital") || desc.includes("cancer")) {
            category = "Healthcare & Medicine";
          } else if (desc.includes("school") || desc.includes("stem") || desc.includes("education") || desc.includes("student") || desc.includes("book")) {
            category = "Education & Youth";
          } else if (desc.includes("animal") || desc.includes("dog") || desc.includes("cat") || desc.includes("rescue") || desc.includes("sanctuary")) {
            category = "Animal Rescue";
          } else if (desc.includes("web3") || desc.includes("open source") || desc.includes("code") || desc.includes("tech")) {
            category = "Open Source & Tech";
          }

          return {
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber ? campaign.deadline.toNumber() : Number(campaign.deadline),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
            category,
            pId: i,
            donators: campaign.donators || [],
            donations: (campaign.donations || []).map(d => ethers.utils.formatEther(d.toString())),
            isSample: false,
          };
        })
        .filter(Boolean);

      // If no on-chain campaigns found yet (e.g. freshly started hardhat node), include curated sample causes
      if (parsedCampaigns.length === 0) {
        return SAMPLE_CAMPAIGNS;
      }

      // If there are real campaigns, we combine real campaigns first then sample causes
      return [...parsedCampaigns, ...SAMPLE_CAMPAIGNS];
    } catch (error) {
      console.warn("Using sample causes fallback (smart contract not responding or empty):", error);
      return SAMPLE_CAMPAIGNS;
    }
  };

  // Get User's Created Campaigns
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    if (!address) return [];
    return allCampaigns.filter(
      (campaign) => campaign.owner?.toLowerCase() === address?.toLowerCase()
    );
  };

  // Get User's Backed / Donated Campaigns
  const getUserDonatedCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    if (!address) return [];
    return allCampaigns.filter((campaign) => {
      if (!campaign.donators) return false;
      return campaign.donators.some(
        (donator) => donator.toLowerCase() === address.toLowerCase()
      );
    });
  };

  // Donate to Campaign
  const donate = async (pId, amount) => {
    if (!address) throw new Error("Please connect your wallet first");

    // Check if it's a sample campaign (not deployed on-chain)
    if (pId >= 9000) {
      showToast(`Simulated donation of ${amount} ETH to sample cause! 💖`, "success");
      return { hash: "0x_mock_tx_sample" };
    }

    showToast(`Initiating donation of ${amount} ETH...`, "info");

    const tx = await contract.donateToCampaign(pId, {
      value: ethers.utils.parseEther(amount),
    });

    await tx.wait();
    showToast(`Donated ${amount} ETH successfully! Thank you for your generosity! 🎉`, "success", tx.hash);
    await fetchBalance(address);
    return tx;
  };

  // Delete Campaign (Owner Only)
  const deleteCampaign = async (pId) => {
    if (!address) throw new Error("Please connect your wallet first");

    if (pId >= 9000) {
      showToast("Sample campaigns cannot be deleted from chain", "info");
      return;
    }

    showToast("Deleting campaign...", "info");
    const tx = await contract.deleteCampaign(pId);
    await tx.wait();
    showToast("Campaign removed successfully from on-chain directory", "success", tx.hash);
    return tx;
  };

  // Get Donations for a Campaign
  const getDonations = async (pId) => {
    if (pId >= 9000) {
      const sample = SAMPLE_CAMPAIGNS.find((c) => c.pId === pId);
      if (sample && sample.donators) {
        return sample.donators.map((donator, i) => ({
          donator,
          donation: sample.donations[i] || "0.5",
        }));
      }
      return [];
    }

    try {
      const donations = await contract.getDonators(pId);
      return donations[0].map((donator, i) => ({
        donator,
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      }));
    } catch (error) {
      console.error("Failed to load donations:", error);
      return [];
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        balance,
        chainId,
        contract,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        getUserDonatedCampaigns,
        donate,
        deleteCampaign,
        getDonations,
        connectWallet,
        switchNetwork,
        isConnecting,
        bookmarks,
        toggleBookmark,
        toasts,
        showToast,
        removeToast,
        quickDonateCampaign,
        setQuickDonateCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);