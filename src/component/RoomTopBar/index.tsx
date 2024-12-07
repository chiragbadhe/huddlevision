import { FC } from "react";
import { Users } from "lucide-react";
import { useRouter } from "next/router";

interface RoomTopBarProps {}

const RoomTopBar: FC<RoomTopBarProps> = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-6 px-6 py-4 bg-teal-50/80 backdrop-blur-sm rounded-xl border border-teal-500 shadow-sm transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-teal-100 rounded-full">
          <Users className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <div className="text-sm text-teal-600 font-medium tracking-wide">
            Active Room • Currently Connected
          </div>
          <div className="text-lg font-semibold text-gray-900">
            Room ID: {router.query.roomId}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600  transition-colors font-medium"
          onClick={() => {
            navigator.clipboard.writeText(router.query.roomId as string);
            // Could add toast notification here
          }}
        >
          <span>Copy Room ID</span>
        </button>
      </div>
    </div>
  );
};

export default RoomTopBar;
