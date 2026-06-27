import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
    <Helmet>
      <title>404 Not Found | Bless Kimbi</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>

    <div className="relative mb-6 select-none">
      <span className="font-display font-bold text-[120px] leading-none text-white/5">404</span>
      <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-6xl text-white">
        404
      </span>
    </div>

    <h1 className="font-display font-bold text-2xl text-white mb-3">Page Not Found</h1>
    <p className="text-gray-400 text-base max-w-sm mb-8">
      The page you're looking for doesn't exist or has been moved.
    </p>

    <div className="flex flex-wrap gap-4 justify-center">
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all"
      >
        <Home size={18} /> Go Home
      </Link>
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all"
      >
        <ArrowLeft size={18} /> Go Back
      </button>
    </div>
  </div>
);

export default NotFound;
