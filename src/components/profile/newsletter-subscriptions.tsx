import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { allNewsletters, newsletterDescriptions } from "../onboarding/mock-data";
import { useUser } from "@/lib/user-context";
import Link from "next/link";

export default function NewsletterSubscriptions() {
  const { user, updateOnboarding } = useUser();
  const selectedNewsletters = user.onboarding.selectedNewsletters;

  const toggleNewsletter = (newsletter: string) => {
    const newNewsletters = selectedNewsletters.includes(newsletter)
      ? selectedNewsletters.filter((n) => n !== newsletter)
      : [...selectedNewsletters, newsletter];
    updateOnboarding({ selectedNewsletters: newNewsletters });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Mail className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">
          Newsletter Subscriptions
        </h3>
      </div>
      
      {selectedNewsletters.length > 0 ? (
        <div className="space-y-4">
          {selectedNewsletters.map((newsletter) => (
            <div key={newsletter} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{newsletter}</p>
                <p className="text-sm text-gray-600">
                  {newsletterDescriptions[newsletter] || "Stay updated with the latest news"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:border-red-300 bg-transparent"
                onClick={() => toggleNewsletter(newsletter)}
              >
                Unsubscribe
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You have no newsletter subscriptions</p>
          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/onboarding">Sign up for Newsletter Subscriptions</Link>
          </Button>
        </div>
      )}
    </div>
  );
}