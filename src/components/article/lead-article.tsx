import Image from "next/image";
import { Badge } from "../ui/badge";

export default function LeadArticle() {
  return (
    <div
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] p-6"
      style={{ backgroundColor: "#282828" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Badge
              variant="secondary"
              className="bg-transparent border border-gray-400 text-white hover:bg-transparent"
            >
              GEORGIA NEWS
            </Badge>
            <span className="text-sm text-gray-300">
              December 19, 2024 • 6 min read
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight">
            Atlanta City Council Approves Major Infrastructure Investment for
            Downtown Revitalization
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            The $2.3 billion plan will transform transportation, housing, and
            green spaces across the city center over the next decade.
          </p>
        </div>

        <div className="space-y-3 mt-6">
          <Image
            src="/placeholder-tsr1e.png"
            alt="Atlanta downtown construction and development"
            className="w-full h-96 object-cover rounded-lg"
            height={384}
            width={832}
          />
          <p className="text-sm text-gray-400 italic">
            Construction cranes dot the Atlanta skyline as the city prepares for
            major infrastructure improvements. (AJC file photo)
          </p>
        </div>
      </div>
    </div>
  );
}
