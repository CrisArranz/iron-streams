import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getStream } from '../../../services/stream-services';

import { Loading, TitlePage } from '../../'
import { Link } from 'react-router-dom';

const convertToHours = (number) => {
  return (number % 60) * 60 + Math.floor(number / 60)
}

function StreamDetail () {

  const [state, setState] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getStream(id)
      .then(stream => setState(stream))
      .catch(error => console.error(error))
  }, [id])

  return (
    <div className="stream-detail container my-5">
      <TitlePage message={`Detail of the Stream: ${state ? state.title : ''}`} />
      { state ? 
      (
        <div className="stream-detail__details container d-flex mt-4">
          <img className="w-50" src={state.thumbnail} alt={state.title} />
          <div className="d-flex flex-column justify-content-around ms-5">
            <div className="d-flex justify-content-around">
              <span className="fs-1">{state.category}</span>
              <span className="fs-1 text-secondary">{state.views}</span>
            </div>
            <p className="d-flex justify-content-center">{state.description}</p>
            <p className="fst-italic">Duration: {convertToHours(state.duration)} min</p>
            <div className="fs-4 fw-bold d-flex justify-content-between">
              <p>{state.author}</p>
              <Link to={`/`} className="btn btn-link">Atras</Link>
            </div>
          </div>
        </div>
      ) : <Loading />}
    </div>
  );
}

export default StreamDetail;