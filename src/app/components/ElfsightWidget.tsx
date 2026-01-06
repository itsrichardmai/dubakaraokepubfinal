import { useEffect, useRef, useState } from "react";

type ElfsightWidgetProps = {
  widgetId: string;
  className?: string;
};

export function ElfsightWidget({ widgetId, className }: ElfsightWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

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

  return (
    <div
      ref={ref}
      className={`elfsight-app-${widgetId} ${className ?? ""}`}
    />
  );
}
