import React from 'react';
import { Badge } from './ui/badge';
interface HashtagListProps extends React.HTMLAttributes<HTMLDivElement> {
    hashtags: string[];
}
export const HashtagList = ({ hashtags } : HashtagListProps) => {
  return (
    <div className='flex gap-4 flex-wrap w-full'>
      {hashtags.map((tag, index) => (
        <Badge key={index} className="hashtag-badge">
          #{tag}
        </Badge>
      ))}
    </div>
  );
};

export default HashtagList;