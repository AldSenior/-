import React, { memo } from "react";
import BookCard from "./BookCard";
import type { Book } from "../types";

interface Props {
  books: Book[];
}

const BookList: React.FC<Props> = ({ books }) => {
  if (!books || books.length === 0) {
    return <div className="empty-state">Ничего не найдено</div>;
  }

  return (
    <section className="book-list">
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </section>
  );
};

export default memo(BookList);
