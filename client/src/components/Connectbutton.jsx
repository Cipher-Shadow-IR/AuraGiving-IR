import React from "react";
import { useStateContext } from "../context";

export default function Connectbutton() {
  const { address, connectWallet, isConnecting } = useStateContext();

  return (
    <div>
      <button
        type="button"
        onClick={connectWallet}
        className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
      >
        {isConnecting
          ? "Connecting..."
          : address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : "Connect Wallet"}
      </button>
    </div>
  );
}