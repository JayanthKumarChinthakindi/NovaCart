import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Rating({ value, text, className = '' }) {
  const stars = [];
  const roundedValue = Math.round(value * 2) / 2;

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedValue) {
      stars.push(<FaStar key={i} className="text-amber-400" />);
    } else if (i - 0.5 === roundedValue) {
      stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-slate-300 dark:text-slate-600" />);
    }
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-sm">{stars}</div>
      {text && (
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {text}
        </span>
      )}
    </div>
  );
}
