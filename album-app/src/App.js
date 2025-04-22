import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput.jsx";
import AlbumList from "./components/AlbumList.jsx";

function App() {
  const [filteredQuery, setfilteredQuery] = useState([]);
  const [albums, setAlbums] = useState([]);

  const fetchAlbum = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((result) => {
        setAlbums(result.data);
        setfilteredQuery(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //useEffect

  useEffect(() => {
    fetchAlbum();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = albums.filter((album) =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setfilteredQuery(filtered);
  };

  return (
    <div className="App">
      <SearchInput onSearch={handleSearch} />
      <AlbumList albums={filteredQuery} />
    </div>
  );
}

export default App;
