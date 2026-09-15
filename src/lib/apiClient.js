import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Instance axios pusat — withCredentials memastikan cookie httpOnly (token
 * JWT) ikut terkirim, sehingga tidak perlu menyimpan token manual di JS.
 */
export const apiClient = axios.create({ baseURL, withCredentials: true });

/** Ekstrak pesan error yang konsisten dari response API. */
export function getErrorMessage(error, fallback = 'Terjadi kesalahan. Silakan coba lagi.') {
  return error?.response?.data?.message || fallback;
}