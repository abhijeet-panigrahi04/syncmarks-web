import React from 'react';
import './App.css';
import AddBookmark from './components/AddBookmark';
import BookmarkList from './components/BookmarkList';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Welcome to Syncmarks</h1>
            <p>This is a simple bookmark manager app.</p>
            <AddBookmark />
            <BookmarkList />
        </div>
    );
};

export default App;