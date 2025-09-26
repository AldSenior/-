// src/components/SortControls.tsx
import React, { memo } from "react";
import type { SortControlsProps } from "../types";

const SortControls: React.FC<SortControlsProps> = ({
  sortConfig,
  onSortChange,
}) => {
  return (
    <div className="sort-controls">
      <button
        className={`sort-controls__btn ${sortConfig.field === "price" ? "is-active" : ""}`}
        onClick={() => onSortChange("price")}
        aria-pressed={sortConfig.field === "price"}
      >
        Цена
        <span
          className={`sort-controls__arrow ${sortConfig.field === "price" ? sortConfig.order : ""}`}
        />
      </button>

      <button
        className={`sort-controls__btn ${sortConfig.field === "author" ? "is-active" : ""}`}
        onClick={() => onSortChange("author")}
        aria-pressed={sortConfig.field === "author"}
      >
        Автор
        <span
          className={`sort-controls__arrow ${sortConfig.field === "author" ? sortConfig.order : ""}`}
        />
      </button>
    </div>
  );
};

export default memo(SortControls);
