import Image from "next/image";

export default function RelatedArticles() {
  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Stories</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Image
            src="/marta-station-atlanta.png"
            alt="MARTA station"
            className="w-full h-48 object-cover rounded-lg"
            width={404}
            height={192}
          />
          <h3 className="font-semibold text-gray-900 hover:text-[#004FFF] cursor-pointer">
            MARTA Expansion Plans Could Connect More Atlanta Neighborhoods
          </h3>
          <p className="text-sm text-gray-500">3 hours ago</p>
        </div>
        <div className="space-y-3">
          <Image
            src="/atlanta-affordable-housing.png"
            alt="Housing development"
            className="w-full h-48 object-cover rounded-lg"
            width={404}
            height={192}
          />
          <h3 className="font-semibold text-gray-900 hover:text-[#004FFF] cursor-pointer">
            Housing Crisis: Atlanta Tackles Affordability with New Initiatives
          </h3>
          <p className="text-sm text-gray-500">1 day ago</p>
        </div>
      </div>
    </div>
  );
}
