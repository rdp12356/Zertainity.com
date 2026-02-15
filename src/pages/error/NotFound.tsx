import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-sans p-6">
      <div className="max-w-md w-full text-center space-y-8">

        {/* Illusration Area */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative z-10 text-[180px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 select-none">
            404
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="w-16 h-1 bg-black rotate-45 absolute top-1/2 left-1/4 rounded-full"></div>
            <div className="w-16 h-1 bg-black -rotate-45 absolute top-1/2 right-1/4 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
          <p className="text-gray-500 text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="h-12 px-6 rounded-xl border-gray-200 hover:bg-white hover:text-black font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="h-12 px-6 rounded-xl bg-black text-white hover:bg-gray-800 font-bold"
          >
            <Home className="w-4 h-4 mr-2" /> Return Home
          </Button>
        </div>

        <div className="pt-12 border-t border-gray-200 mt-12">
          <p className="text-xs text-gray-400">
            If you believe this is a mistake, please <a href="#" className="underline hover:text-black">contact support</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
