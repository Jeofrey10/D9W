interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 18 }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      {Array.from({ length: fullStars }, (_, i) => (
        <svg
          key={`full-${i}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="var(--color-accent)"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {hasHalf && (
        <svg
          key="half"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="half-star-grad">
              <stop offset="50%" stopColor="var(--color-accent)" />
              <stop offset="50%" stopColor="var(--color-stone-light)" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#half-star-grad)"
          />
        </svg>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <svg
          key={`empty-${i}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="var(--color-stone-light)"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
