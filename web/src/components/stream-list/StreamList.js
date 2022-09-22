import { useEffect, useState } from 'react';
import { getStreams, deleteStream } from '../../services/stream-services';

import { StreamItem, TitlePage } from '../'

function StreamList () {

  const [streams, setStreams ] = useState(null)

  useEffect(() => {
    getStreams()
      .then(streams => {
        setStreams(streams)
      })
      .catch(error => console.error(error))
  }, [])

  const handleDelete = id => {
    deleteStream(id)
      .then(() => {
        return getStreams()
          .then(streams => {
            setStreams(streams)
          })
        }
      )
      .catch(error => console.error(error))
  }

  return (
    <div className="stream-list d-flex flex-column align-items-center container mt-4">
      <TitlePage message="List of Streams" />
      { streams ? streams.map(stream => <StreamItem key={stream.id} {...stream} onDelete={handleDelete}/>) : <div>123123</div> }
    </div>
  );
}

export default StreamList;