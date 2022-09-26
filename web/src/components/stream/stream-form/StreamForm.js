import React from 'react';
import { useForm } from 'react-hook-form';
import * as streamsService from '../../../services/stream-services';
import { TitlePage } from '../../';

function StreamForm() {
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({ mode: 'onTouched' });

  const handleCreateStreamSubmit = (data) => {
    streamsService.createStream(data)
      .then(stream => console.log('Todo bien majo', stream))
      .catch(error => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          console.log(errors);
          Object.keys(error.response.data.errors)
            .forEach((error) => {
              setError(error, {  message: errors[error].message })
            })
        }
      })
  }

  return (
    <div className="container">
      <TitlePage message="Create Stream" icon="wpexplorer" />
      <form onSubmit={handleSubmit(handleCreateStreamSubmit)}>
        <div className="input-group mb-1">
          <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
          <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} placeholder="Stream title..." 
            {...register('title', { 
              required: 'Title is required'
            })} />
          {errors.title && (<div className="invalid-feedback">{errors.title.message}</div>)}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
          <textarea cols="50" type="text" className={`form-control ${errors.description ? 'is-invalid' : ''}`} placeholder="Stream description..." 
            {...register('description', { 
              required: 'Description is required'
            })} />
          {errors.description && (<div className="invalid-feedback">{errors.description.message}</div>)}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
          <input type="text" className={`form-control ${errors.url ? 'is-invalid' : ''}`} placeholder="Stream url..." 
            {...register('url', { 
              required: 'Url is required',
              validate: (url) => {
                try {
                  new URL(url);
                  return true;
                } catch(error) {
                  return 'URL invalid';
                }
              }
            })} />
          {errors.url && (<div className="invalid-feedback">{errors.url.message}</div>)}
        </div>

        <div className="d-grid mt-2">
          <button className="btn btn-primary" type='submit' disabled={!isValid}>Create Stream</button>
        </div>
      </form>
    </div>
  )
}

export default StreamForm