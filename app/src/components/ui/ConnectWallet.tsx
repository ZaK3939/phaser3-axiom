"use client";
import { ConnectKitButton } from "connectkit";

import styled from "styled-components";
const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  color: #ffffff;
  background: #2D2D2D;
  font-size: 16px;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: 200ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 40px -6px #2D2D2D;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 32px -6px #2D2D2D;
  }

  img {
    margin-right: 10px;
  }
`;

export const ConnectWallet = ({ buttonText = "Connect Wallet" }) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <StyledButton onClick={show}>
            {isConnected ? ensName ?? truncatedAddress : buttonText}
          </StyledButton>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
