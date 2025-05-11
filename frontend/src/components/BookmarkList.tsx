import React from 'react';

interface Bookmark {
    title: string;
    url: string;
}

interface BookmarkListProps {
    bookmarks: Bookmark[];
    onDelete: (index: number) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onDelete }) => {
    console.log("Rendering BookmarkList with bookmarks:", bookmarks);
    return (
        <div>
            <h2>Bookmarks</h2>
            <ul>
                {bookmarks.map((bookmark, index) => (
                    <li key={index}>
                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                            {bookmark.title}
                        </a>
                        <button onClick={() => onDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookmarkList;