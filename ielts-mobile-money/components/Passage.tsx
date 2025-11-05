
import React from 'react';
import { PassageData } from '../types';

interface PassageProps {
  data: PassageData;
  highlightedParagraphId: string | null;
}

const Passage: React.FC<PassageProps> = ({ data, highlightedParagraphId }) => {
  return (
    <article id="passage-container">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{data.title}</h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {data.paragraphs.map((p) => (
          <div
            key={p.id}
            className={`flex gap-4 p-2 rounded-md transition-colors duration-500 ${
              p.id === highlightedParagraphId ? 'bg-yellow-200' : ''
            }`}
          >
            <span className="font-bold text-teal-700">{p.id}</span>
            <p>{p.content}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Passage;