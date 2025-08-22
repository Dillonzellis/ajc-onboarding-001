import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative z-10">
      <div className="flex flex-col items-center justify-center min-h-screen gap-8">
        <div className={`transition-opacity duration-1000`}>
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/ajc-white-logo.svg"
              alt="AJC Logo"
              width={670}
              height={335}
              className="object-contain max-w-[670px] w-full h-auto"
            />
            <h1 className="text-white text-center text-2xl max-w-4xl px-4 tracking-normal font-light">
              {
                'Welcome to your AJC personalization experience.\n\nDon\'t worry if you forget something...you can always revisit your preference settings under the "Profile" section.'
              }
            </h1>
            <div className="mt-6 mb-4">
              <Image
                src="/profile-illustration.png"
                alt="Profile section illustration"
                width={400}
                height={100}
                className="object-contain"
              />
            </div>
            <Button
              asChild
              className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors mt-4"
            >
              <Link href="/onboarding/newsletters">Let&apos;s get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
