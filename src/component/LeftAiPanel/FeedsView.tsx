import { FC } from "react";
import PanelWrapper from "./PanelWrapper";
import { Rss } from "lucide-react";

interface FeedItem {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
}

interface FeedsViewProps {}

const FeedsView: FC<FeedsViewProps> = () => {
  const demoFeeds: FeedItem[] = [
    {
      id: 1,
      title: "New AI Features Released",
      description:
        "Check out the latest AI-powered features in our platform...",
      link: "https://example.com/ai-features",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Upcoming Virtual Events",
      description: "Join our upcoming virtual meetups and workshops...",
      link: "https://example.com/events",
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Platform Updates",
      description: "Recent improvements and bug fixes in the latest release...",
      link: "https://example.com/updates",
      date: "2024-01-13",
    },
  ];

  return (
    <PanelWrapper>
      <div className="flex items-center gap-2">
        <Rss className="w-5 h-5 text-teal-500" />
        <h3 className="text-lg font-semibold text-gray-900">Latest Updates</h3>
      </div>
      <div className="min-h-[200px] p-4 bg-white rounded-lg space-y-4 overflow-scroll h-[200px]">
        {demoFeeds.map((feed) => (
          <div
            key={feed.id}
            className="border-b border-gray-200 pb-3 last:border-0"
          >
            <a
              href={feed.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-gray-100 rounded p-2 transition-colors"
            >
              <h4 className="font-medium text-gray-900">{feed.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{feed.description}</p>
              <span className="text-gray-400 text-xs mt-2 block">
                {feed.date}
              </span>
            </a>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
};

export default FeedsView;
