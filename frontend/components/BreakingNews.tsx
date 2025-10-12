import { BREAKING_NEWS } from "@/lib/constants";

export default function BreakingNews() {
  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="breaking-news whitespace-nowrap">
        <span className="text-primary font-bold">BREAKING:</span>
        <span className="ml-2">{BREAKING_NEWS[0]}</span>
        <span className="mx-8">•</span>
        <span>{BREAKING_NEWS[1]}</span>
        <span className="mx-8">•</span>
        <span>{BREAKING_NEWS[2]}</span>
      </div>
    </div>
  );
}

