import RemotePeer from "@/component/RemotePeer/RemotePeer";
import { TPeerMetadata } from "@/utils/types";
import {
  useActivePeers,
  useLocalAudio,
  useLocalPeer,
  useLocalScreenShare,
  useLocalVideo,
  usePeerIds,
  useRoom,
  useRoomMetadata,
} from "@huddle01/react/hooks";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { Video, VideoOff, Mic, MicOff, Users, AudioLines } from "lucide-react";
import LeftAiPanel from "@/component/LeftAiPanel";
import JoinRoom from "@/component/Room/JoinRoom";
import AudioTranslator from "@/component/AudioTranslator";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  token: string;
};

function Home({ token }: Props) {
  const [displayName, setDisplayName] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { joinRoom, state } = useRoom({
    onJoin: (room) => {
      console.log("onJoin", room);
      updateMetadata({ displayName });
    },
    onPeerJoin: (peer) => {
      console.log("onPeerJoin", peer);
    },
  });
  const { enableVideo, isVideoOn, stream, disableVideo } = useLocalVideo();
  const {
    enableAudio,
    disableAudio,
    isAudioOn,
    stream: audioStream,
  } = useLocalAudio();

  const { activePeerIds, dominantSpeakerId } = useActivePeers();

  const { updateMetadata } = useLocalPeer<TPeerMetadata>();
  const { peerIds } = usePeerIds();

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const { roomData } = useRoomMetadata<{}>({});

  console.log({roomData});

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="mx-4 py-6">
        {state === "idle" && (
          <JoinRoom
            displayName={displayName}
            setDisplayName={setDisplayName}
            state={state}
            joinRoom={async (params) => {
              await joinRoom(params);
            }}
            token={token}
            roomId={router.query.roomId as string}
          />
        )}

        {state === "connected" && (
          <div className="flex space-x-[20px]">
            <div>
              <div className="relative rounded-2xl min-w-[900px] h-fit  overflow-hidden bg-gray-100 backdrop-blur-lg border border-teal-500 p-1">
                {isVideoOn ? (
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">Camera is off</span>
                  </div>
                )}

                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-30">
                  <button
                    type="button"
                    className={`p-4 rounded-full transition-all duration-200 ${
                      isVideoOn
                        ? "bg-teal-500 hover:bg-teal-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                    onClick={async () => {
                      isVideoOn ? await disableVideo() : await enableVideo();
                    }}
                  >
                    {isVideoOn ? (
                      <Video className="w-6 h-6" />
                    ) : (
                      <VideoOff className="w-6 h-6" />
                    )}
                  </button>

                  <button
                    type="button"
                    className={`p-4 rounded-full transition-all duration-200 ${
                      isAudioOn
                        ? "bg-teal-500 hover:bg-teal-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                    onClick={async () => {
                      isAudioOn ? await disableAudio() : await enableAudio();
                    }}
                  >
                    {isAudioOn ? (
                      <Mic className="w-6 h-6" />
                    ) : (
                      <MicOff className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>

              <div className="border rounded-2xl mt-5  border-teal-500">
                {state === "connected" && <AudioTranslator />}
              </div>
            </div>

            <div className=" bg-gray-100 border border-teal-500 p-4 rounded-2xl w-full">
              {/* peers */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal-500" />
                    <span className="text-gray-700">Participants</span>
                  </div>
                  <div className="text-sm opacity-60 cursor-pointer">
                    Show All
                  </div>
                </div>
                <div className="grid grid-cols-2 mt-2 gap-3 auto-rows-auto p-1 max-w-[600px]">
                  {peerIds.length > 0 ? (
                    peerIds.map((peerId) =>
                      peerId ? (
                        <div
                          key={peerId}
                          className={`aspect-video bg-white/90 backdrop-blur-lg rounded-xl overflow-hidden border ${
                            dominantSpeakerId === peerId
                              ? "border-blue-500"
                              : "border-teal-500"
                          } relative`}
                        >
                          <RemotePeer peerId={peerId} />
                          {dominantSpeakerId === peerId && (
                            <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                              <AudioLines className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 bg-black/50 rounded-md px-2 py-1">
                            <span className="text-xs text-white">
                              {peerId.slice(0, 8)}...
                            </span>
                          </div>
                        </div>
                      ) : null
                    )
                  ) : (
                    <div className="aspect-video bg-gray-100 backdrop-blur-lg rounded-xl overflow-hidden border border-teal-500 flex items-center justify-center">
                      <span className="text-gray-500">No peers joined yet</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full">
                {state === "connected" && <LeftAiPanel />}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const accessToken = new AccessToken({
    apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
    roomId: ctx.params?.roomId?.toString() || "",
    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
  });

  const token = await accessToken.toJwt();

  return {
    props: { token },
  };
};

export default Home;
