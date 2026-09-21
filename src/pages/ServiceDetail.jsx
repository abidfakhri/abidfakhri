import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, Mail } from 'lucide-react';
import { servicesApi } from '../api/services.api.js';
import { profileApi } from '../api/profile.api.js';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { Button } from '../components/ui/Button.jsx';
import { PageSpinner } from '../components/ui/Spinner.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [email, setEmail] = useState('');
  const [notFound, setNotFound] = useState(false);

  usePageMeta({
    title: service
      ? `${service.nama} — Muhamad 'Abid Fakhri Nabiil`
      : "Layanan — Muhamad 'Abid Fakhri Nabiil",
    description: service?.deskripsi || undefined,
    path: `/services/${id}`,
  });

  useEffect(() => {
    servicesApi
      .get(id)
      .then(setService)
      .catch(() => setNotFound(true));
    profileApi
      .get()
      .then((p) => setEmail(p.email))
      .catch(() => {});
  }, [id]);

  if (notFound) {
    return <EmptyState icon={Briefcase} title="Layanan tidak ditemukan" action={<Button as={Link} to="/services">Kembali ke layanan</Button>} />;
  }
  if (!service) return <PageSpinner />;

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/services" className="mb-6 inline-flex items-center gap-1.5 text-sm text-sub hover:text-ink">
        <ArrowLeft size={15} /> Kembali ke layanan
      </Link>

      <GlassCard className="overflow-hidden">
        {service.thumbnail_url && <img src={service.thumbnail_url} alt={service.nama} className="h-64 w-full object-cover" />}
        <div className="p-8">
          <p className="text-xs font-medium text-accent">{service.kode}</p>
          <h1 className="mt-1 text-2xl font-bold text-ink">{service.nama}</h1>
          {service.harga && <p className="mt-2 text-lg font-semibold text-accent-light">{service.harga}</p>}
          <p className="mt-6 whitespace-pre-line leading-relaxed text-sub">{service.deskripsi}</p>

          {email && (
            <Button as="a" href={`mailto:${email}?subject=${encodeURIComponent('Pertanyaan mengenai ' + service.nama)}`} className="mt-8">
              <Mail size={16} /> Hubungi untuk pesan
            </Button>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
