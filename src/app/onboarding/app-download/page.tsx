import Image from "next/image";
import ProgressBar from "@/components/progress-bar/progress-bar";
import OnboardingContBtns from "@/components/onboarding/helper_components/onboarding-cont-btns";

export default function AppDownLoadPage() {
  return (
    <div>
      <ProgressBar currentStep={4} />
      <div
        className={`relative z-30 pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center px-4">
            <div className="flex flex-col items-center justify-center mb-8 mt-10">
              <h3 className="text-white text-2xl font-semibold">
                One last thing before we finish...
              </h3>
            </div>
            <div className="flex justify-center mb-12">
              <Image
                src="/ajc-app-mockup.png"
                alt="AJC News App Features"
                width={800}
                height={400}
                className="object-contain max-w-full h-auto"
                priority
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12 mx-auto max-w-4xl">
              <div className="flex-shrink-0 order-2 lg:order-1">
                <div className="bg-white p-6 rounded-lg">
                  <Image
                    src="/ajc-qr-code.jpg"
                    alt="QR Code to download AJC News app"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1 order-1 lg:order-2">
                <div className="flex-shrink-0">
                  <Image
                    src="/ajc-app-icon.png"
                    alt="AJC News App Icon"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 md:text-left text-center">
                  <p className="text-white text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                    Stay informed, connected, and up to date with the AJC News
                    app. Our app provides you with in-depth news and
                    personalized real-time news alerts.
                  </p>
                </div>
              </div>
            </div>
            <OnboardingContBtns
              backLink="/onboarding/topics"
              contLink="/onboarding/review"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
