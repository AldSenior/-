import type { Book, SortField, SortConfig } from "../types";

export const STORAGE_KEY = "bookstore_selected_tags";

export const getStoredTags = (): string[] => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Ошибка чтения из sessionStorage:", error);
    return [];
  }
};

export const storeSelectedTags = (tags: string[]): void => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
  } catch (error) {
    console.error("Ошибка записи в sessionStorage:", error);
  }
};

export const extractUniqueTags = (books: Book[]): string[] => {
  const allTags = books.flatMap((book) => book.tags || []);
  return [...new Set(allTags)].sort((a, b) => a.localeCompare(b));
};

// Теперь если у книги нет date -> считаем книгу невалидной (как в ТЗ)
export const validateBook = (book: Book): boolean => {
  const requiredFields = [
    "id",
    "title",
    "author",
    "price",
    "tags",
    "description",
    "illustrator",
    "date",
  ];

  const missingFields = requiredFields.filter((field) => {
    const value = book[field as keyof Book];
    return (
      value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "string" && value.trim() === "")
    );
  });

  if (missingFields.length > 0) {
    console.error(
      `Книга с ID ${book.id ?? "unknown"} пропущена — отсутствуют поля: ${missingFields.join(
        ", ",
      )}`,
    );
    return false;
  }

  return true;
};

export const filterBooksByTags = (books: Book[], selectedTags: string[]) => {
  if (!selectedTags || selectedTags.length === 0) return books;
  return books.filter((book) =>
    selectedTags.every((t) => book.tags.includes(t)),
  );
};

const parseDate = (dateString?: string) => {
  if (!dateString) return new Date(0);
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? new Date(0) : d;
};

const getAuthorLastName = (author: string) => {
  const parts = author.trim().split(/\s+/);
  return parts[parts.length - 1].toLowerCase();
};

export const sortBooks = (books: Book[], sortConfig: SortConfig) => {
  if (!sortConfig || !sortConfig.field) return books;
  const result = [...books].sort((a, b) => {
    let cmp = 0;
    if (sortConfig.field === "price") {
      cmp = a.price - b.price;
      if (cmp === 0)
        cmp = getAuthorLastName(a.author).localeCompare(
          getAuthorLastName(b.author),
        );
    } else if (sortConfig.field === "author") {
      const da = parseDate(a.date);
      const db = parseDate(b.date);
      cmp = da.getTime() - db.getTime();
      if (cmp === 0)
        cmp = getAuthorLastName(a.author).localeCompare(
          getAuthorLastName(b.author),
        );
    }
    return sortConfig.order === "desc" ? -cmp : cmp;
  });
  return result;
};

export const getNewSortConfig = (
  currentConfig: SortConfig,
  newField: SortField,
): SortConfig => {
  if (currentConfig.field === newField) {
    return {
      field: newField,
      order: currentConfig.order === "asc" ? "desc" : "asc",
    };
  }
  return { field: newField, order: "asc" };
};

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
) => {
  let timeout: number | undefined;
  return (...args: Parameters<T>) => {
    if (timeout) window.clearTimeout(timeout);
    timeout = window.setTimeout(() => fn(...args), wait);
  };
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);

export const formatDate = (dateString?: string) => {
  if (!dateString) return "Дата не указана";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "Неверная дата";
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

export const truncateText = (text: string, maxLength: number) =>
  text.length <= maxLength ? text : text.slice(0, maxLength).trim() + "...";
