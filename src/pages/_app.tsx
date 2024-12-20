import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { HuddleClient, HuddleProvider } from "@huddle01/react";
import Header from "@/component/Header";

const huddleClient = new HuddleClient({
  projectId: "zMQHa6hH5hGrxfwYZp7z8I-1lWScI7UA",
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HuddleProvider client={huddleClient}>
      <Header />
      <Component {...pageProps} />
    </HuddleProvider>
  );
}
