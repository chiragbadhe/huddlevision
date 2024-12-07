import { FC, useState } from "react";
import { Video, Users, ArrowRight, Loader2 } from "lucide-react";

interface JoinRoomProps {
  displayName: string;
  setDisplayName: (name: string) => void;
  state: string;
  joinRoom: (params: { roomId: string; token: string }) => Promise<void>;
  token: string;
  roomId: string;
}

const JoinRoom: FC<JoinRoomProps> = ({
  displayName,
  setDisplayName,
  state,
  joinRoom,
  token,
  roomId,
}) => {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinRoom = async () => {
    try {
      setIsJoining(true);
      await joinRoom({
        roomId,
        token,
      });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="backdrop-blur-lg bg-white/90 rounded-2xl p-8 w-full max-w-[500px] border border-teal-500">
        <div className="text-center mb-8">
          <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Ready to Join?
          </h1>
          <p className="text-gray-600">
            Join the meeting with crystal-clear video and real-time translation
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700"
            >
              How should we call you?
            </label>
            <div className="relative">
              <input
                id="displayName"
                disabled={state !== "idle"}
                placeholder="Enter your display name"
                type="text"
                className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-200 pl-10 transition-all duration-200"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <button
            disabled={!displayName || isJoining}
            type="button"
            className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-xl text-lg
            hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02]
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
            w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            flex items-center justify-center gap-2"
            onClick={handleJoinRoom}
          >
            {isJoining ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Joining...
              </>
            ) : (
              <>
                Join Meeting
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="flex justify-center gap-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-500">Privacy Focused</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-500">Huddle01</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-500">Live Translation</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm text-center">
            By joining, you agree to our{" "}
            <a href="#" className="text-teal-500 hover:underline">
              terms of service
            </a>{" "}
            and{" "}
            <a href="#" className="text-teal-500 hover:underline">
              privacy policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
