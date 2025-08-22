import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { neighborhoods } from "../onboarding/mock-data";
import { useUser } from "@/lib/user-context";
import Link from "next/link";

const neighborhoodNames = neighborhoods.map(
  (neighborhood) => neighborhood.name,
);

const NeighborhoodBadge = ({
  neighborhoodName,
  isSelected,
  onToggle,
}: {
  neighborhoodName: string;
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
      {neighborhoodName}
    </Badge>
  );
};

export default function Neighborhoods() {
  const { user, updateOnboarding } = useUser();
  const selectedNeighborhoods = user.onboarding.selectedNeighborhoods;

  const toggleNeighborhood = (neighborhood: string) => {
    const newNeighborhoods = selectedNeighborhoods.includes(neighborhood)
      ? selectedNeighborhoods.filter((n) => n !== neighborhood)
      : [...selectedNeighborhoods, neighborhood];
    updateOnboarding({ selectedNeighborhoods: newNeighborhoods });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <MapPin className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Neighborhoods</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {neighborhoodNames.map((neighborhoodName) => (
          <NeighborhoodBadge
            key={neighborhoodName}
            neighborhoodName={neighborhoodName}
            isSelected={selectedNeighborhoods.includes(neighborhoodName)}
            onToggle={() => toggleNeighborhood(neighborhoodName)}
          />
        ))}
      </div>
      {/* <Button asChild variant="outline" className="mt-4 bg-transparent"> */}
      {/*   <Link href="/onboarding">Customize Neighborhoods</Link> */}
      {/* </Button> */}
    </div>
  );
}

