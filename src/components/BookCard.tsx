import React, { memo } from "react";
import type { BookCardProps } from "../types/index";
import { formatPrice, formatDate, truncateText } from "../utils/bookUtils";

const BookCard: React.FC<BookCardProps> = memo(({ book }) => {
  const { title, author, price, date, tags } = book;

  return (
    <article className="book-card" data-testid={`book-card-${book.id}`}>
      <header className="book-card__header">
        <h3 className="book-card__title" title={title}>
          {truncateText(title, 60)}
        </h3>
        <p className="book-card__author" title={author}>
          by {truncateText(author, 40)}
        </p>
      </header>

      {date && (
        <time className="book-card__date" dateTime={date}>
          {formatDate(date)}
        </time>
      )}

      <div className="book-card__price">{formatPrice(price)}</div>

      <footer className="book-card__footer">
        <div className="book-card__tags">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={`${book.id}-tag-${index}`} className="book-card__tag">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="book-card__tag book-card__tag--more">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </footer>
    </article>
  );
});

BookCard.displayName = "BookCard";

export default BookCard;
