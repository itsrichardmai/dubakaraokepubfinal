import { useEffect, useRef, useState } from "react";
import { Star, ExternalLink } from "lucide-react";

type ElfsightWidgetProps = {
  widgetId: string;
  className?: string;
  yelpUrl?: string;
};

const YELP_URL = "https://www.yelp.com/biz/duba-karaoke-and-pub-elkins-park?osq=Duba+Karaoke+Pub";

function YelpFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="flex items-center gap-1 mb-2">
        {[...Array(4)].map((_, index) => (
          <Star key={index} className="text-yellow-400 w-8 h-8" fill="currentColor" />
        ))}
        <div className="relative w-8 h-8">
          <Star className="text-gray-600 w-8 h-8" fill="currentColor" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="text-yellow-400 w-8 h-8" fill="currentColor" />
          </div>
        </div>
      </div>
      <p className="text-yellow-400 font-semibold text-lg mb-4">4.5 out of 5 stars</p>
      <h4 className="text-2xl font-bold text-white mb-2">Loved by Our Guests!</h4>
      <p className="text-gray-400 mb-6 max-w-md">
        See what our guests are saying about their experience at Duba Karaoke & Pub.
      </p>
      <a
        href={YELP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Read Reviews on Yelp
        <ExternalLink size={18} />
      </a>
    </div>
  );
}

export function ElfsightWidget({ widgetId, className, yelpUrl = YELP_URL }: ElfsightWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Observe visibility
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // preload before visible
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Load Elfsight script when visible
  useEffect(() => {
    if (!load) return;

    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).elfsight?.reinit) {
      (window as any).elfsight.reinit();
    }
  }, [load]);

  // Check if widget loaded properly after a delay
  useEffect(() => {
    if (!load) return;

    const checkWidgetLoaded = () => {
      if (!ref.current) return;

      // Check if the widget container has meaningful content
      const widgetContent = ref.current.querySelector('[class*="eapps"]');
      const hasContent = widgetContent && widgetContent.children.length > 0;

      // Also check for error states or empty widget
      const errorElement = ref.current.querySelector('[class*="error"]');
      const emptyWidget = ref.current.innerHTML.trim() === '' ||
                          ref.current.querySelector('.elfsight-app-placeholder');

      if (errorElement || emptyWidget || !hasContent) {
        setShowFallback(true);
      }
    };

    // Check after widget has time to load (5 seconds)
    const initialCheck = setTimeout(checkWidgetLoaded, 5000);

    // Also set up a MutationObserver to detect if widget gets removed
    const mutationObserver = new MutationObserver(() => {
      // If content disappears or shows error
      if (ref.current) {
        const hasError = ref.current.querySelector('[class*="error"]');
        const isEmpty = ref.current.children.length === 0 ||
                        (ref.current.textContent?.includes('limit') ?? false);
        if (hasError || isEmpty) {
          setShowFallback(true);
        }
      }
    });

    if (ref.current) {
      mutationObserver.observe(ref.current, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    return () => {
      clearTimeout(initialCheck);
      mutationObserver.disconnect();
    };
  }, [load]);

  if (showFallback) {
    return <YelpFallback />;
  }

  return (
    <div
      ref={ref}
      className={`elfsight-app-${widgetId} ${className ?? ""}`}
    />
  );
}
