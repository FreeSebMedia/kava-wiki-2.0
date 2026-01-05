import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { GlossaryTermData, tooltipLabels, getGlossaryLink } from "@/data/glossaryTerms";
import { Language } from "@/lib/i18n";

interface GlossaryTooltipProps {
  term: GlossaryTermData;
  lang: Language;
  children: ReactNode;
}

export function GlossaryTooltip({ term, lang, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; placement: "top" | "bottom" }>({
    top: 0,
    left: 0,
    placement: "bottom",
  });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const labels = tooltipLabels[lang] || tooltipLabels.de;

  // Calculate tooltip position when open
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 320; // w-80 = 20rem = 320px
      const tooltipHeight = tooltipRef.current?.offsetHeight || 200;
      
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      
      // Determine vertical placement
      const placement = spaceBelow < tooltipHeight + 20 && spaceAbove > spaceBelow ? "top" : "bottom";
      
      // Calculate position
      let top: number;
      if (placement === "top") {
        top = triggerRect.top + window.scrollY - tooltipHeight - 8;
      } else {
        top = triggerRect.bottom + window.scrollY + 8;
      }
      
      // Center horizontally on the trigger, but keep within viewport
      let left = triggerRect.left + window.scrollX + (triggerRect.width / 2) - (tooltipWidth / 2);
      
      // Ensure tooltip stays within viewport horizontally
      const minLeft = 16;
      const maxLeft = window.innerWidth - tooltipWidth - 16;
      left = Math.max(minLeft, Math.min(maxLeft, left));
      
      setPosition({ top, left, placement });
    }
  }, [isOpen]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (triggerRef.current && tooltipRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipHeight = tooltipRef.current.offsetHeight;
        const tooltipWidth = 320;
        
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;
        const placement = spaceBelow < tooltipHeight + 20 && spaceAbove > spaceBelow ? "top" : "bottom";
        
        let top: number;
        if (placement === "top") {
          top = triggerRect.top + window.scrollY - tooltipHeight - 8;
        } else {
          top = triggerRect.bottom + window.scrollY + 8;
        }
        
        let left = triggerRect.left + window.scrollX + (triggerRect.width / 2) - (tooltipWidth / 2);
        const minLeft = 16;
        const maxLeft = window.innerWidth - tooltipWidth - 16;
        left = Math.max(minLeft, Math.min(maxLeft, left));
        
        setPosition({ top, left, placement });
      }
    };

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleTooltipMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Tooltip content rendered via Portal
  const tooltipContent = isOpen && (
    <div
      ref={tooltipRef}
      id={`tooltip-${term.id}`}
      role="tooltip"
      className="fixed z-[9999] w-80 max-w-[90vw] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-primary/80 animate-in fade-in-0 zoom-in-95 duration-200"
      style={{
        top: position.top,
        left: position.left,
        position: "absolute",
      }}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    >
      {/* Arrow */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-primary/80 rotate-45 ${
          position.placement === "top"
            ? "bottom-[-9px] border-r-2 border-b-2"
            : "top-[-9px] border-l-2 border-t-2"
        }`}
      />

      {/* Content */}
      <div className="relative p-6">
        {/* Term Title */}
        <h4 className="text-xl font-bold text-foreground mb-3 font-serif">
          {term.term}
          {term.germanTerm && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({term.germanTerm})
            </span>
          )}
        </h4>

        {/* Short Definition */}
        <p className="text-base text-muted-foreground leading-relaxed mb-5">
          {term.shortDefinition}
        </p>

        {/* More Info Link */}
        <Link
          href={getGlossaryLink(lang, term.id)}
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium text-sm transition-colors group"
          onClick={() => setIsOpen(false)}
        >
          {labels.moreInfo}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        className="glossary-term cursor-help border-b-2 border-dotted border-primary/50 hover:border-primary transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        tabIndex={0}
        role="button"
        aria-describedby={isOpen ? `tooltip-${term.id}` : undefined}
      >
        {children}
      </span>
      {typeof document !== "undefined" && createPortal(tooltipContent, document.body)}
    </>
  );
}

export default GlossaryTooltip;
