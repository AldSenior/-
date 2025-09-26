// src/components/BookStorePage.tsx
import React, { useCallback } from "react";
import { useBookStore } from "../hooks/useBookStore";
import SortControls from "./SortControls";
import FilterTags from "./FilterTags";
import BookList from "./BookList";

const BookStorePage: React.FC = () => {
  const {
    books,
    allBooks,
    availableTags,
    selectedTags,
    sortConfig,
    isTagMenuOpen,
    toggleTag,
    clearTags,
    changeSort,
    toggleTagMenu,
    closeTagMenu,
    counts,
  } = useBookStore();

  // onSortChange wrapper
  const onSortChange = useCallback((field) => changeSort(field), [changeSort]);

  return (
    <main className="container">
      <header className="top-controls">
        <h1 className="brand">Book Store</h1>

        <div className="controls-row">
          <SortControls sortConfig={sortConfig} onSortChange={onSortChange} />
          <FilterTags
            availableTags={availableTags}
            selectedTags={selectedTags}
            isOpen={isTagMenuOpen}
            onToggleMenu={toggleTagMenu}
            onClearFilters={clearTags}
            onTagToggle={toggleTag}
          />
        </div>
      </header>

      <div className="meta">
        <div>Всего: {counts.total}</div>
        <div>Показано: {counts.filtered}</div>
        {counts.activeFilters > 0 && <div>Фильтры: {counts.activeFilters}</div>}
      </div>

      <BookList books={books} />
    </main>
  );
};

export default BookStorePage;
