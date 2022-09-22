import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001/api/v1'
})

export function getStreams() {
  return http.get("/streams").then(res => res.data);
}

export function getStream(id) {
  return http.get(`/streams/${id}`).then(res => res.data);
}

export function deleteStream(id) {
  return http.delete(`/streams/${id}`).then(res => res.data);
}