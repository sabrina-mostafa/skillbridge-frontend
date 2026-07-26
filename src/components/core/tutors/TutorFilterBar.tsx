import { Search, SlidersHorizontal, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function TutorFilterBar() {

    const { searchParams, setQuery, clearAll } = useQueryParams();

    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const debouncedMinPrice = useDebounce(minPrice, 500);
    const debouncedMaxPrice = useDebounce(maxPrice, 500);

    const [search, setSearch] = useState(searchParams.get("searchTerm") || "");
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const currentSearch = searchParams.get("searchTerm") || "";

        if (debouncedSearch !== currentSearch) {
            setQuery("searchTerm", debouncedSearch);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        const current = searchParams.get("minPrice") || "";

        if (debouncedMinPrice !== current) {
            setQuery("minPrice", debouncedMinPrice);
        }
    }, [debouncedMinPrice]);

    useEffect(() => {
        const current = searchParams.get("maxPrice") || "";

        if (debouncedMaxPrice !== current) {
            setQuery("maxPrice", debouncedMaxPrice);
        }
    }, [debouncedMaxPrice]);


    return (
        <div className="mb-10 mx-4 rounded-3xl border bg-card/70 backdrop-blur-sm p-5 shadow-sm">
            <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <SlidersHorizontal className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            Filter Tutors
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Find the perfect tutor faster
                        </p>
                    </div>

                </div>

                {/* RIGHT */}
                <div className="flex flex-wrap gap-3">

                    {/* SEARCH */}
                    <div className="relative min-w-70">

                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search tutors, subjects..."
                            className="pl-10 h-11 rounded-xl"
                        />

                    </div>

                    {/* RATING */}
                    <Select
                        value={searchParams.get("minRating") || ""}
                        onValueChange={(value) => setQuery("minRating", value)}
                    >
                        <SelectTrigger className="min-h-11 cursor-pointer min-w-42.5 rounded-xl border bg-background px-4 shadow-sm hover:bg-muted/50 transition">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <SelectValue placeholder="All Ratings" />
                            </div>
                        </SelectTrigger>

                        <SelectContent className="rounded-lg font-bold">
                            <SelectItem value="0" className="h-9 p-4 focus:bg-primary focus:text-primary-foreground"> All Ratings</SelectItem>
                            <SelectItem value="3" className="h-9 p-4 focus:bg-primary focus:text-primary-foreground"> 3+ Rating & above</SelectItem>
                            <SelectItem value="4" className="h-9 p-4 focus:bg-primary focus:text-primary-foreground"> 4+ Rating & above</SelectItem>
                            <SelectItem value="5" className="h-9 p-4 focus:bg-primary focus:text-primary-foreground"> 5 Star Only</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* PRICE RANGE */}
                    <div className="flex items-center gap-2">

                        <Input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min Price"
                            className="w-32 h-11 rounded-xl"
                        />

                        <span className="text-muted-foreground">
                            —
                        </span>

                        <Input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max Price"
                            className="w-32 h-11 rounded-xl"
                        />
                    </div>

                    {/* FEATURED */}
                    <Button
                        type="button"
                        variant={
                            searchParams.get("isFeatured") === "true"
                                ? "default"
                                : "outline"
                        }
                        className="h-11 cursor-pointer rounded-xl"
                        onClick={() =>
                            setQuery(
                                "isFeatured",
                                searchParams.get("isFeatured") === "true"
                                    ? ""
                                    : "true"
                            )
                        }
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Featured
                    </Button>

                    {/* CLEAR */}
                    <Button
                        variant="ghost"
                        className="h-11 cursor-pointer rounded-xl bg-primary/10 text-primary font-bold"
                        onClick={() => {
                            clearAll("/tutors", { scroll: false });

                            setSearch("");
                            setMinPrice("");
                            setMaxPrice("");
                        }}
                    >
                        Reset
                    </Button>

                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">

                {searchParams.get("searchTerm") && (
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        Search: {searchParams.get("searchTerm")}
                    </div>
                )}

                {searchParams.get("minRating") && (
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        Rating {searchParams.get("minRating")}+
                    </div>
                )}

                {searchParams.get("isFeatured") === "true" && (
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        Featured
                    </div>
                )}

            </div>
        </div>
    )
}