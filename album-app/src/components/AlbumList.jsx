import React from "react";

function AlbumList({ albums }) {
  return (
    <div>
      <ul>
        {albums.map((album) => {
          return <li key={album.id}>{album.title}</li>;
        })}
      </ul>
    </div>
  );
}
export default AlbumList;
