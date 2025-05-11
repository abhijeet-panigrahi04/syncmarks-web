import React, { useState, useEffect } from 'react';
import AddBookmark from './components/AddBookmark';
import BookmarkList from './components/BookmarkList';

interface Bookmark {
    title: string;
    url: string;
}

const App: React.FC = () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    useEffect(() => {
        // Fetch bookmarks from the backend
        fetch('http://127.0.0.1:8000/bookmarks')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched bookmarks:", data);
                setBookmarks(data);
            })
            .catch(error => console.log("Error fetching bookmarks:", error));
    }, []);

    const handleAddBookmark = (newBookmark: Bookmark) => {
        console.log("Adding new bookmark:", newBookmark);
        setBookmarks(prevBookmarks => [...prevBookmarks, newBookmark]);
    };

    const handleDeleteBookmark = (index: number) => {
        console.log("Deleting bookmark at index:", index);
        fetch(`http://127.0.0.1:8000/bookmarks/${index}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                setBookmarks(prevBookmarks => prevBookmarks.filter((_, i) => i !== index));
            })
            .catch(error => console.log("Error deleting bookmark:", error));
    };

    return (
        <div className="App">
            <h1>Syncmarks</h1>
            <AddBookmark onAdd={handleAddBookmark} />
            <BookmarkList bookmarks={bookmarks} onDelete={handleDeleteBookmark} />
        </div>
    );
};

export default App;