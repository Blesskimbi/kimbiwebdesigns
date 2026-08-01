import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Helmet>
      <title>404 Not Found | Bless Kimbi</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>

    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center py-16">
    <div className="relative mb-6 select-none">
      <span className="font-display font-bold text-[120px] leading-none text-muted">404</span>
      <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-6xl text-navy">
        404
      </span>
    </div>

    <h1 className="font-display font-bold text-2xl text-navy mb-3">Page Not Found</h1>
    <p className="text-muted-foreground text-base max-w-sm mb-8 font-body">
      The page you're looking for doesn't exist or has been moved.
    </p>

    <div className="flex flex-wrap gap-4 justify-center">
      <Link
        to="/"
        className="btn-green inline-flex items-center gap-2 !py-3 !px-6"
      >
        <Home size={18} /> Go Home
      </Link>
      <button
        onClick={() => window.history.back()}
        className="btn-outline-navy inline-flex items-center gap-2 !py-3 !px-6"
      >
        <ArrowLeft size={18} /> Go Back
      </button>
    </div>
    </div>
  </div>
);

export default NotFound;
