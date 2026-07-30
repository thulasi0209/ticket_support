import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const client = axios.create({ baseURL: API_URL, timeout: 30000 })

export function predict(payload) {
  return client.post('/predict', payload).then((r) => r.data)
}

export function batchPredict(formData) {
  return client.post('/batch-predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {},
  }).then((r) => r.data)
}

export function getHistory(params) {
  return client.get('/history', { params }).then((r) => r.data)
}

export function getAnalytics() {
  return client.get('/analytics').then((r) => r.data)
}

export function getModelInfo() {
  return client.get('/model-info').then((r) => r.data)
}

export default client
