import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  strainId: string;
  strainName: string;
  variant?: "icon" | "button" | "small";
  className?: string;
}

export default function FavoriteButton({
  strainId,
  strainName,
  variant = "icon",
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isActive = isFavorite(strainId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(strainId, strainName);
    
    if (isActive) {
      toast.info(`${strainName} aus Favoriten entfernt`);
    } else {
      toast.success(`${strainName} zu Favoriten hinzugefügt`);
    }
  };

  if (variant === "button") {
    return (
      <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        onClick={handleClick}
        className={cn(
          "gap-2 transition-all",
          isActive && "bg-red-500 hover:bg-red-600 text-white border-red-500",
          className
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all",
            isActive && "fill-current"
          )}
        />
        {isActive ? "Favorit" : "Favorisieren"}
      </Button>
    );
  }

  if (variant === "small") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "p-1 rounded-full transition-all hover:scale-110",
          isActive
            ? "text-red-500 hover:text-red-600"
            : "text-muted-foreground hover:text-red-400",
          className
        )}
        title={isActive ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all",
            isActive && "fill-current"
          )}
        />
      </button>
    );
  }

  // Default: icon variant
  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 rounded-full transition-all hover:scale-110 hover:bg-accent",
        isActive
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground hover:text-red-400",
        className
      )}
      title={isActive ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all",
          isActive && "fill-current"
        )}
      />
    </button>
  );
}
