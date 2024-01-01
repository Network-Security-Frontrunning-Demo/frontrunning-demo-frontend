import "normalize.css/normalize.css";
import "@/styles/globals.scss";
// import "antd/dist/reset.css";
// import 'antd/dist/antd.css';
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import store, { persistor } from "@/configs/redux";
import LayoutDefault from "@/layouts/LayoutDefault";
import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { localhost } from "@/services/wagmi/localhost";

import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: localhost,
    transport: http(),
  }),
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={config}>
            <LayoutDefault>
              <Component {...pageProps} />
            </LayoutDefault>
          </WagmiConfig>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
