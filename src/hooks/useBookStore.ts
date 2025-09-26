// src/hooks/useBookStore.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import booksData from "../data/books.json";
import type { Book, SortField } from "../types";
import {
  extractUniqueTags,
  filterBooksByTags,
  getStoredTags,
  getNewSortConfig,
  storeSelectedTags,
  sortBooks,
  validateBook,
} from "../utils/bookUtils";

export const useBookStore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(() =>
    getStoredTags(),
  );
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState({
    field: null as SortField | null,
    order: "asc" as "asc" | "desc",
  });
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const data = booksData as { books: Book[] };
      // пропускаем книги без обязательных полей (включая date)
      const valid = data.books.filter((b) => validateBook(b));
      setBooks(valid);
      setAvailableTags(extractUniqueTags(valid));
    } catch (err) {
      console.error("Ошибка загрузки books.json", err);
      setBooks([]);
      setAvailableTags([]);
    }
  }, []);

  const processedBooks = useMemo(() => {
    const filtered = filterBooksByTags(books, selectedTags);
    return sortBooks(filtered, sortConfig);
  }, [books, selectedTags, sortConfig]);

  useEffect(() => {
    storeSelectedTags(selectedTags);
  }, [selectedTags]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clearTags = useCallback(() => setSelectedTags([]), []);

  const changeSort = useCallback((field: SortField) => {
    setSortConfig((prev) => getNewSortConfig(prev, field));
  }, []);

  const toggleTagMenu = useCallback(() => setIsTagMenuOpen((v) => !v), []);
  const closeTagMenu = useCallback(() => setIsTagMenuOpen(false), []);

  return {
    books: processedBooks,
    allBooks: books,
    availableTags,
    selectedTags,
    sortConfig,
    isTagMenuOpen,
    toggleTag,
    clearTags,
    changeSort,
    toggleTagMenu,
    closeTagMenu,
    counts: {
      total: books.length,
      filtered: processedBooks.length,
      activeFilters: selectedTags.length,
    },
  } as const;
};
