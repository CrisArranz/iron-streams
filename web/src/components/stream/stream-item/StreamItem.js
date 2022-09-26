import { Link } from 'react-router-dom';

function StreamItem ({id, title, description, author, thumbnail, category, onDelete}) {
  return (
    <div className="stream-item col-4 my-2">
      <div className="card">
        <Link to={`streams/${id}`} className="text-decoration-none text-dark">
          <img src={thumbnail} className="card-img-top" alt={title} />
          <div className="card-body">
            <h3 className="card-title">{title}</h3>
            <p className="card-text fw-bold fs-4">@{author}</p>
            <div className="d-flex justify-content-between">
              <p className="card-text fw-bold">Category: {category}</p>
            </div>
          </div>
        </Link>
        <button className="btn btn-link text-end" onClick={() => {onDelete(id)}}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
      </div>
    </div>
  );
}

export default StreamItem;