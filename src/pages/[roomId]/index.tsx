import { useCallback, useEffect, useRef, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import {
  useActivePeers,
  useLocalAudio,
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
  useRoom,
  useRoomMetadata,
} from "@huddle01/react/hooks";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Users,
  AudioLines,
  SpeakerIcon,
  LucideMonitorSpeaker,
} from "lucide-react";

import RemotePeer from "@/component/RemotePeer/RemotePeer";
import LeftAiPanel from "@/component/LeftAiPanel";
import JoinRoom from "@/component/Room/JoinRoom";
import AudioTranslator from "@/component/AudioTranslator";
import { TPeerMetadata } from "@/utils/types";
import LoadingScreen from "@/component/StateScreens/LoadingScreen";
import RoomTopBar from "@/component/RoomTopBar";
import TranslatedText from "@/component/AudioTranslator/TranslatedText";
import useTranscription from "@/hooks/useTranscription";

type Props = {
  token: string;
};

function Home({ token }: Props) {
  // State
  const [displayName, setDisplayName] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  // Huddle01 Hooks
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
  const { roomData } = useRoomMetadata<{}>({});

  const { transcription, isListening, error, startListening, stopListening } =
    useTranscription({ language: "en-US" });

  console.log(transcription, isListening, error, startListening, stopListening);

  const handleAudioToggle = useCallback(async () => {
    try {
      if (isAudioOn) {
        await disableAudio();
        stopListening;
      } else {
        await enableAudio();
        startListening();
      }
    } catch (error) {
      console.error("Failed to toggle audio:", error);
    }
  }, [isAudioOn, disableAudio, enableAudio]);

  const handleVideoToggle = useCallback(async () => {
    try {
      if (isVideoOn) {
        await disableVideo();
      } else {
        await enableVideo();
      }
    } catch (error) {
      console.error("Failed to toggle video:", error);
    }
  }, [isVideoOn, disableVideo, enableVideo]);

  // Effects
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Render Methods
  const renderVideoSection = () => (
    <div className="relative rounded-2xl min-w-[900px] h-fit overflow-hidden bg-gray-100 backdrop-blur-lg border border-teal-500 p-1">
      {isVideoOn ? (
        <div className="aspect-video rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover scale-x-[-1]"
            autoPlay
            muted
          />
        </div>
      ) : (
        <div className="aspect-video rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <VideoOff className="w-10 h-10 text-gray-400" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 font-medium">
              Camera is turned off
            </span>
            <span className="text-gray-400 text-sm">
              Click the camera button below to turn it on
            </span>
          </div>
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
          onClick={handleVideoToggle}
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
          onClick={handleAudioToggle}
        >
          {isAudioOn ? (
            <Mic className="w-6 h-6" />
          ) : (
            <MicOff className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );

  const renderPeersSection = () => (
    <div className="grid grid-cols-2 w-full mt-2 gap-3 auto-rows-auto ">
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
        <div className="aspect-video bg-gray-100 backdrop-blur-lg rounded-xl overflow-hidden border border-teal-500 flex flex-col items-center justify-center gap-4 p-6">
          <Users className="w-12 h-12 text-teal-400 animate-pulse" />

          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="mx-4 py-6">
        {state === "connected" && <RoomTopBar />}

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
        {state === "connecting" && <LoadingScreen />}

        {state === "connected" && (
          <div className=" flex  gap-6">
            <div className="space-y-6">
              {renderVideoSection()}

              <div className="bg-white border border-teal-500 rounded-2xl shadow-sm overflow-hidden">
                <AudioTranslator />
              </div>

              <div>
                <TranslatedText
                  peerId={dominantSpeakerId}
                  transcriptedText={transcription}
                />
              </div>
            </div>

            <div className="bg-white border border-teal-500 rounded-2xl min-w-1/2 p-6 shadow-sm w-full">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-50 rounded-lg">
                      <Users className="w-5 h-5 text-teal-500" />
                    </div>
                    <h2 className="font-semibold text-gray-900">
                      Participants
                    </h2>
                  </div>
                  <button className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors">
                    View All
                  </button>
                </div>
                <div>{renderPeersSection()}</div>
              </div>

              <div className="w-full">
                <LeftAiPanel />
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
