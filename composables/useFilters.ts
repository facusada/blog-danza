import { computed, reactive, ref, watch } from 'vue';

export interface FilterState {
  year: string;
  city: string;
  venue: string;
  search: string;
}

export interface VenueOption {
  value: string;
  label: string;
}

type MaybeArray<T> = T | T[] | null | undefined;

interface FilterConfig<T> {
  items: () => T[];
  getYear?: (item: T) => MaybeArray<string | number>;
  getCity?: (item: T) => MaybeArray<string>;
  getVenue?: (item: T) => MaybeArray<string>;
  getVenueLabel?: (slug: string) => string;
  searchIn?: (item: T) => Array<string | undefined>;
  pageSize?: number;
}

export const useFilters = <T>({
  items,
  getYear,
  getCity,
  getVenue,
  getVenueLabel,
  searchIn,
  pageSize = 6
}: FilterConfig<T>) => {
  const DEFAULT_STATE: FilterState = { year: '', city: '', venue: '', search: '' };
  const filters = reactive({ ...DEFAULT_STATE });
  const page = ref(1);

  const rawItems = computed(() => items() ?? []);

  const years = computed(() => {
    if (!getYear) {
      return [] as string[];
    }
    const set = new Set<string>();
    rawItems.value.forEach((item) => {
      const value = getYear(item);
      if (value === undefined || value === null) {
        return;
      }
      const values = Array.isArray(value) ? value : [value];
      values.forEach((year) => {
        if (year !== undefined && year !== null) {
          set.add(String(year));
        }
      });
    });
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  });

  const cities = computed(() => {
    if (!getCity) {
      return [] as string[];
    }
    const set = new Set<string>();
    rawItems.value.forEach((item) => {
      const value = getCity(item);
      if (!value) {
        return;
      }
      const values = Array.isArray(value) ? value : [value];
      values.forEach((city) => {
        if (city) {
          set.add(city);
        }
      });
    });
    return Array.from(set).sort();
  });

  const venues = computed(() => {
    if (!getVenue) {
      return [] as VenueOption[];
    }
    const map = new Map<string, string>();
    rawItems.value.forEach((item) => {
      const slugValue = getVenue(item);
      if (!slugValue) {
        return;
      }
      const slugs = Array.isArray(slugValue) ? slugValue : [slugValue];
      slugs.forEach((slug) => {
        if (!slug) {
          return;
        }
        const label = getVenueLabel ? getVenueLabel(slug) : slug;
        if (!map.has(slug)) {
          map.set(slug, label);
        }
      });
    });
    return Array.from(map.entries()).map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label));
  });

  const filteredItems = computed(() => {
    return rawItems.value.filter((item) => {
      const matchesYear =
        !filters.year ||
        (getYear
          ? (() => {
              const value = getYear(item);
              const values = Array.isArray(value) ? value : [value];
              return values.map((year) => String(year)).includes(filters.year);
            })()
          : true);
      const matchesCity =
        !filters.city ||
        (getCity
          ? (() => {
              const value = getCity(item);
              const values = Array.isArray(value) ? value : [value];
              return values.includes(filters.city);
            })()
          : true);
      const matchesVenue =
        !filters.venue ||
        (getVenue
          ? (() => {
              const value = getVenue(item);
              const values = Array.isArray(value) ? value : [value];
              return values.includes(filters.venue);
            })()
          : true);
      const matchesSearch = !filters.search
        || (searchIn
          ? searchIn(item)
              .filter((value): value is string => Boolean(value))
              .some((value) => value.toLowerCase().includes(filters.search.toLowerCase()))
          : true);
      return matchesYear && matchesCity && matchesVenue && matchesSearch;
    });
  });

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / pageSize)));

  const paginatedItems = computed(() => {
    const start = (page.value - 1) * pageSize;
    return filteredItems.value.slice(start, start + pageSize);
  });

  watch(
    () => ({ ...filters }),
    () => {
      page.value = 1;
    },
    { deep: true }
  );

  const setPage = (value: number) => {
    page.value = Math.min(Math.max(1, value), totalPages.value);
  };

  const resetFilters = () => {
    Object.assign(filters, DEFAULT_STATE);
  };

  return {
    filters,
    years,
    cities,
    venues,
    page,
    totalPages,
    paginatedItems,
    setPage,
    resetFilters
  };
};
