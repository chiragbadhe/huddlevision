import { FC } from "react";

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
  return (
    <div className="flex items-center justify-center">
      <div className="backdrop-blur-lg bg-white rounded-2xl p-8 max-w-[500px] shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800 mb-8 animate-fade-in">
            Welcome to HuddleVision
          </h1>
          <p className="text-slate-600 text-xl mb-8">
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <label
              htmlFor="displayName"
              className="block text-base font-medium text-slate-700"
            >
              Display Name
            </label>
            <input
              id="displayName"
              disabled={state !== "idle"}
              placeholder="Enter your display name"
              type="text"
              className="w-full px-4 py-3 bg-slate-50 text-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-200"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </div>

          <button
            disabled={!displayName}
            type="button"
            className="group relative px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl text-xl
            hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02]
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
            shadow-lg shadow-indigo-200"
            onClick={async () => {
              await joinRoom({
                roomId,
                token,
              });
            }}
          >
            Join Meeting
          </button>

          <p className="text-slate-400 text-sm text-center">
            By joining, you agree to our terms of service and privacy policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
