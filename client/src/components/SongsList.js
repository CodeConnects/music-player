import React from 'react';
import { useSelector } from 'react-redux';

function SongsList() {
  const {allSongs} = useSelector((state) => state.user);

  return (  
    <div>
      {allSongs.map((song) => (
        <div className='flex items-center justify-between'>
          <h1>{song.title}</h1>
          <h2>{song.artist}</h2>
          <h3>{song.album}</h3>
        </div>
      ))}

    </div>
  );
}

export default SongsList;
