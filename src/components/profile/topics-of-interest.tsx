import { BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { topics } from "../onboarding/mock-data";
import { useUser } from "@/lib/user-context";
import Link from "next/link";

const topicNames = topics.map((topic) => topic.name);

const TopicBadge = ({
  topicName,
  isSelected,
  onToggle,
}: {
  topicName: string;
  isSelected: boolean;
  onToggle: () => void;
}) => {
  return (
    <Badge
      variant={isSelected ? "secondary" : "outline"}
      className={`
        justify-center py-2 cursor-pointer transition-colors hover:bg-blue-100
        ${isSelected ? "bg-blue-50 text-[#004FFF] border-[#004FFF]" : ""}
      `}
      onClick={onToggle}
    >
      {topicName}
    </Badge>
  );
};

export default function TopicsOfInterest() {
  const { user, updateOnboarding } = useUser();
  const selectedTopics = user.onboarding.selectedTopics;

  const toggleTopic = (topic: string) => {
    const newTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    updateOnboarding({ selectedTopics: newTopics });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <BookOpen className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">
          Topics of Interest
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {topicNames.map((topicName) => (
          <TopicBadge
            key={topicName}
            topicName={topicName}
            isSelected={selectedTopics.includes(topicName)}
            onToggle={() => toggleTopic(topicName)}
          />
        ))}
      </div>
      {/* <Button asChild variant="outline" className="mt-4 bg-transparent"> */}
      {/*   <Link href="/onboarding">Customize Topics</Link> */}
      {/* </Button> */}
    </div>
  );
}
