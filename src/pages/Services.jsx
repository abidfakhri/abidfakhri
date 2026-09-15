import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { servicesApi } from '../api/services.api.js';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { PageSpinner } from '../components/ui/Spinner.jsx';

export default function Services() {
  const [services, setServices] = useState(null);

  useEffect(() => {
    servicesApi.list().then(setServices).catch(() => setServices([]));
  }, []);

  if (!services) return <PageSpinner />;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Layanan</h1>
        <p className="mt-1 text-sm text-sub">Jasa yang bisa Anda pesan.</p>
      </div>

      {!services.length ? (
        <EmptyState icon={Briefcase} title="Belum ada layanan" description="Layanan yang ditambahkan akan tampil di sini." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <GlassCard key={service.id} hover className="flex flex-col overflow-hidden">
              <Link to={`/services/${service.id}`}>
                {service.thumbnail_url ? (
                  <img src={service.thumbnail_url} alt={service.nama} className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center bg-white/3 text-accent">
                    <Briefcase size={28} />
                  </div>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium text-accent">{service.kode}</p>
                <Link to={`/services/${service.id}`} className="mt-1 font-semibold text-ink hover:text-accent-light">
                  {service.nama}
                </Link>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-sub">{service.deskripsi}</p>
                {service.harga && <p className="mt-3 text-sm font-medium text-ink">{service.harga}</p>}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
