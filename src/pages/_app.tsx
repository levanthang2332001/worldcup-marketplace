import { AppProps } from 'next/app';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/styles.css';

import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ChakraProvider } from '@chakra-ui/react';
import { bscTestnet } from 'viem/chains';
import { ApolloProvider } from '@apollo/client';
import { WFCIMarket } from '@/apollo/client';

const { publicClient, webSocketPublicClient } = configureChains(
  [bscTestnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={WFCIMarket}>
      <ChakraProvider>
        <WagmiConfig config={config}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
