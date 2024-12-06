import { useState } from "react";
import { Video, Copy, ArrowRight, Loader2, CheckCircle } from "lucide-react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const createRoom = async () => {
    try {
      setIsCreating(true);
      const response = await fetch(
        "https://api.huddle01.com/api/v1/create-room",
        {
          method: "POST",
          body: JSON.stringify({
            title: "HuddleVision Meeting",
            hostWalletAddress: "0x0000000000000000000000000000000000000000",
          }),
          headers: {
            "Content-type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const data = await response.json();
      const newRoomId = data?.data?.roomId;

      if (!newRoomId) {
        throw new Error("No room ID received");
      }

      setCreatedRoomId(newRoomId);
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create meeting room. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const joinRoom = () => {
    if (!roomId) {
      alert("Please enter a room ID");
      return;
    }
    window.location.href = `/${roomId}`;
  };

  const copyRoomLink = () => {
    if (!createdRoomId) return;
    const link = `${window.location.origin}/${createdRoomId}`;
    navigator.clipboard.writeText(link);
    alert("Room link copied to clipboard!");
  };

  return (
    <main className="min-h-screen container mx-auto flex flex-col items-center justify-center bg-gradient-to-b ">
      <div className="text-center flex flex-col items-center justify-center max-w-4xl px-6">
        <div className="mb-16">
          <h1 className="text-6xl font-black bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in">
            Unlock Conversations. Capture Insights.
          </h1>
          <p className="text-gray-500 text-2xl mb-8 leading-relaxed font-light">
            Experience seamless video meetings with crystal-clear quality and
            instant room creation
          </p>
          <div className="flex items-center justify-center space-x-6 text-gray-500">
            <span className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-teal-500" />
              No Downloads
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-teal-500" />
              No Sign Up
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-teal-500" />
              Free to Use
            </span>
          </div>
        </div>

        <div className="backdrop-blur-lg bg-white/80 rounded-2xl p-8 max-w-[500px] shadow-lg border border-gray-100">
          <div className="space-y-8">
            <div className="space-y-4">
              <button
                onClick={createRoom}
                disabled={isCreating}
                className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-xl text-xl
                hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
                w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Room...
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5" />
                    Create New Room
                  </>
                )}
              </button>

              {createdRoomId && (
                <div className="flex items-center justify-center gap-4 animate-fade-in">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={`${window.location.origin}/${createdRoomId}`}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12 border border-gray-200"
                    />
                    <button
                      onClick={copyRoomLink}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy room link"
                    >
                      <Copy className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-400">OR</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter Room ID"
                  className="flex-1 px-4 py-3 text-gray-800 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 border border-gray-200"
                />
                <button
                  onClick={joinRoom}
                  className="px-8 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 flex items-center gap-2"
                >
                  Join Room
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-8">
          No registration required. Just create or join a room to start your
          meeting.
        </p>
      </div>
    </main>
  );
}
