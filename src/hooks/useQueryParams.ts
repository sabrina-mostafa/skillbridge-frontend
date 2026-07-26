"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SetQueryOptions = {
    resetPage?: boolean;
};

export function useQueryParams() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setQuery = (
        key: string,
        value: string,
        options?: SetQueryOptions
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        // reset pagination if needed
        const shouldResetPage = options?.resetPage ?? [
            "searchTerm",
            "minRating",
            "minPrice",
            "maxPrice",
            "isFeatured",
        ].includes(key);

        if (shouldResetPage) {
            params.set("page", "1");
        }

        router.replace(`?${params.toString()}`, {
            scroll: false,
        });
    };

    const clearAll = (basePath: string, options?: { scroll?: boolean }) => {
        router.push(basePath, {
            scroll: options?.scroll ?? false,
        });
    };

    return {
        searchParams,
        setQuery,
        clearAll,
    };
}