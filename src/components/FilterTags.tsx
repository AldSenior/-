// src/components/FilterTags.tsx
import React, { memo, useRef } from "react";
import type { FilterTagsProps } from "../types";
import { useClickOutside } from "../hooks/useClickOutside";

const FilterTags: React.FC<FilterTagsProps> = ({
  availableTags,
  selectedTags,
  isOpen,
  onToggleMenu,
  onTagToggle,
  onClearFilters,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(
    ref,
    () => {
      if (isOpen) onToggleMenu(); // закрываем меню при клике вне
    },
    isOpen,
  );

  return (
    <div className="filter-tags">
      <button className="filter-tags__toggle" onClick={onToggleMenu}>
        Теги {selectedTags.length ? `(${selectedTags.length})` : ""}
      </button>
      <button onClick={onClearFilters} className="filter-tags__toggle">
        Очистить теги
      </button>

      {isOpen && (
        <div className="filter-tags__menu" ref={ref}>
          <div className="filter-tags__actions">
            <span className="filter-tags__hint">
              Выберите один или несколько тегов
            </span>
          </div>

          <div className="filter-tags__list" role="list">
            {availableTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  className={`filter-tags__item ${active ? "is-active" : ""}`}
                  onClick={() => onTagToggle(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(FilterTags);
