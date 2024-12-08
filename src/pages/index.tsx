import { useState, useEffect } from "react";
import { Video, Copy, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import FramerMotionWrapper from "@/component/FramerMotionWrapper";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

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
    const link = `${origin}/${createdRoomId}`;
    navigator.clipboard.writeText(link);
  };

  return (
      <FramerMotionWrapper className="min-h-screen pt-[50px] bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <div className="mx-4 py-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-black bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in">
              Experience Better Meetings
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Join instantly with one click - no downloads or sign ups needed.
              Get crystal-clear video, AI assistance, and real-time translation
              in every meeting.
            </p>

            <div className="flex justify-center gap-8 mb-12 flex-wrap">
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-lg shadow-sm border transition-shadow">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span className="text-gray-700 font-medium">
                  Crystal Clear Video
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-lg shadow-sm border transition-shadow">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span className="text-gray-700 font-medium">
                  Real-time Translation
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-lg shadow-sm border transition-shadow">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span className="text-gray-700 font-medium">AI Assistance</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
              {/* Create Room Card */}
              <div className="backdrop-blur-lg bg-white/90 rounded-2xl p-8 border border-teal-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Create a New Meeting
                </h2>
                <p className="text-gray-600 mb-6">
                  Start a new meeting instantly and invite others to join.
                  Perfect for scheduled meetings or spontaneous calls.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="http://localhost:3000/"
                        value={
                          createdRoomId ? `${origin}/${createdRoomId}` : ""
                        }
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
                  <button
                    onClick={createRoom}
                    disabled={isCreating}
                    className="group relative px-8 py-4 bg-teal-500 text-white font-bold rounded-xl text-xl
                  hover:bg-teal-600 transition-all duration-200
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
                </div>
              </div>

              {/* Join Room Card */}
              <div className="backdrop-blur-lg bg-white/90 rounded-2xl p-8 border border-teal-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Join Existing Meeting
                </h2>
                <p className="text-gray-600 mb-6">
                  Have a meeting ID? Enter it below to join an existing meeting.
                  Make sure you have the correct meeting ID from the host.
                </p>

                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      placeholder="Enter Room ID"
                      className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 border border-gray-200"
                    />
                    <button
                      onClick={joinRoom}
                      className="w-full px-8 py-4 bg-teal-500 text-white font-bold rounded-xl text-xl
                    hover:bg-teal-600 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 flex items-center justify-center gap-2"
                    >
                      Join Room
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                By using HuddleVision, you agree to our Terms of Service and
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </FramerMotionWrapper>
    
  );
}
