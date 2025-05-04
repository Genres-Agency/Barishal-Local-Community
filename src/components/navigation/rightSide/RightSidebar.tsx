import CommunityStats from "./stats/CommunityStats";
import TrendingTopics from "./trending/TrendingTopics";

interface RightSidebarProps {
  onTrendTopicSelect: (hashtagId: number) => void;
}

const RightSidebar = ({ onTrendTopicSelect }: RightSidebarProps) => {
  return (
    <div className="py-6 space-y-6">
      <CommunityStats />
      <TrendingTopics onTrendTopicSelect={onTrendTopicSelect} />
    </div>
  );
};

export default RightSidebar;
