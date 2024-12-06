import { FC } from "react";
import PanelWrapper from "./PanelWrapper";
import { Rss } from "lucide-react";

interface FeedsViewProps {}

const FeedsView: FC<FeedsViewProps> = () => {
  return (
    <PanelWrapper>
      <div className="flex items-center gap-2">
        <Rss className="w-5 h-5 text-teal-500" />
        <h3 className="text-lg font-semibold text-gray-900">Feeds</h3>
      </div>
      <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-sm">
          Feeds content will appear here...
        </p>
      </div>
    </PanelWrapper>
  );
};

export default FeedsView;
