import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">পেজটি খুঁজে পাওয়া যায়নি</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। পেজটি সরানো হয়েছে বা
        লিংকটি ভুল হতে পারে।
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </Button>
    </div>
  );
}
