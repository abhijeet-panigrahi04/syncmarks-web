import React, { useState } from 'react';

interface AddBookmarkProps {
    onAdd: (newBookmark: { title: string; url: string }) => void;
}

const AddBookmark: React.FC<AddBookmarkProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBookmark = { title, url };

        fetch('http://127.0.0.1:8000/bookmarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBookmark),
        })
            .then(response => response.json())
            .then(data => {
                onAdd(data);  // Call parent function to update the list
                setTitle('');
                setUrl('');
            })
            .catch(error => console.log("Error adding bookmark:", error));
    };

    return (
        <div>
            <h2>Add Bookmark</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Bookmark Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="url"
                    placeholder="Bookmark URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <button type="submit">Add Bookmark</button>
            </form>
        </div>
    );
};

export default AddBookmark;
