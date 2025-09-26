export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  date?: string;
  tags: string[];
  description: string;
}

export interface BooksData {
  books: Book[];
}

export type SortField = "price" | "author" | null;
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField | null;
  order: SortOrder;
}

export interface FilterState {
  selectedTags: string[];
  sortConfig: SortConfig;
}

export interface BookStoreState extends FilterState {
  books: Book[];
  filteredBooks: Book[];
  availableTags: string[];
  isTagMenuOpen: boolean;
}

export interface BookCardProps {
  book: Book;
}

export interface SortControlsProps {
  sortConfig: SortConfig;
  onSortChange: (field: SortField) => void;
}

export interface FilterTagsProps {
  availableTags: string[];
  selectedTags: string[];
  isOpen: boolean;
  onToggleMenu: () => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}
