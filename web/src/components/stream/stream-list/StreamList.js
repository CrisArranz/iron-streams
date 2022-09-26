import { useEffect, useState } from 'react';
import { getStreams, deleteStream } from '../../../services/stream-services';

import { StreamItem, TitlePage, Loading } from '../..'

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
    <div className="stream-list container">
      <TitlePage message="List of Streams" icon="wpexplorer" />
      <div className="d-flex flex-column align-items-center mt-4">
      { 
        streams ? 
        <div className="row">
          { streams.map(stream => <StreamItem key={stream.id} {...stream} onDelete={handleDelete}/>)}
        </div> : 
        <Loading /> 
      }
      </div>
    </div>
  );
}

export default StreamList;