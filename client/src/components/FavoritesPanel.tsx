import { Link } from "wouter";
import { Heart, X, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";
import strainsData from "@/data/strains.json";

interface FavoritesPanelProps {
  compact?: boolean;
  showClearButton?: boolean;
}

export default function FavoritesPanel({
  compact = false,
  showClearButton = true,
}: FavoritesPanelProps) {
  const { favorites, removeFavorite, clearFavorites, isLoaded } = useFavorites();
  const strains = strainsData.strains;

  if (!isLoaded) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-8 text-center text-muted-foreground">
          Lade Favoriten...
        </CardContent>
      </Card>
    );
  }

  if (favorites.length === 0) {
    return (
      <Card className="border-dashed border-primary/30">
        <CardContent className="py-8 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground mb-2">
            Noch keine Favoriten gespeichert
          </p>
          <p className="text-sm text-muted-foreground">
            Klicken Sie auf das Herz-Symbol bei einer Sorte, um sie hier zu speichern.
          </p>
          <Link href="/de/sorten/profile">
            <Button variant="outline" size="sm" className="mt-4 gap-2">
              Sorten entdecken
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Get full strain data for favorites
  const favoriteStrains = favorites
    .map((fav) => {
      const strain = strains.find((s) => s.id === fav.id);
      return strain ? { ...strain, addedAt: fav.addedAt } : null;
    })
    .filter(Boolean)
    .sort((a, b) => (b?.addedAt || 0) - (a?.addedAt || 0));

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "heady":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "balanced":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "heavy":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            Meine Favoriten ({favorites.length})
          </h3>
          {showClearButton && favorites.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFavorites}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Alle löschen
            </Button>
          )}
        </div>
        {favoriteStrains.map((strain) =>
          strain ? (
            <div
              key={strain.id}
              className="flex items-center justify-between p-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors group"
            >
              <Link href={`/de/sorten/profile#${strain.id}`}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(
                      strain.category
                    )}`}
                  >
                    {strain.category}
                  </span>
                  <span className="font-medium text-sm">{strain.name}</span>
                </div>
              </Link>
              <button
                onClick={() => removeFavorite(strain.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                title="Entfernen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            Meine Favoriten
          </CardTitle>
          {showClearButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFavorites}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Alle löschen
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {favoriteStrains.map((strain) =>
          strain ? (
            <div
              key={strain.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
            >
              <Link href={`/de/sorten/profile#${strain.id}`}>
                <div className="cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{strain.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(
                        strain.category
                      )}`}
                    >
                      {strain.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{strain.origin}</span>
                    <span className="text-amber-500">
                      {"★".repeat(strain.strength)}
                      {"☆".repeat(5 - strain.strength)}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <Link href={`/de/sorten/profile#${strain.id}`}>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Details
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
                <button
                  onClick={() => removeFavorite(strain.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                  title="Entfernen"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : null
        )}

        <div className="pt-3 border-t">
          <Link href="/de/sorten/vergleich">
            <Button variant="outline" size="sm" className="w-full gap-2">
              Sorten vergleichen
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
