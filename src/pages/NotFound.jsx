import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <EmptyState
      icon={Compass}
      title="404 — Halaman tidak ditemukan"
      description="Halaman yang Anda cari tidak ada atau sudah dipindahkan."
      action={
        <Button as={Link} to="/">
          Kembali ke Beranda
        </Button>
      }
    />
  );
}
