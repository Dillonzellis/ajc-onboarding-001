import Link from "next/link";

interface OnboardingContBtnsProps {
  backLink: string;
  contLink: string;
  contText?: string;
}

export default function OnboardingContBtns({
  backLink,
  contLink,
  contText = "Continue",
}: OnboardingContBtnsProps) {
  return (
    <div className="flex justify-center gap-4 mt-12">
      <Link
        href={backLink}
        className="bg-transparent text-white justify-center items-center flex border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
      >
        Back
      </Link>
      <Link
        href={contLink}
        className="bg-white text-gray-800 justify-center items-center flex px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
      >
        {contText}
      </Link>
    </div>
  );
}
