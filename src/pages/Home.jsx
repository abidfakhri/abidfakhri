import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, MapPin, RotateCw, Sparkles } from 'lucide-react';
import { profileApi } from '../api/profile.api.js';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { PageSpinner } from '../components/ui/Spinner.jsx';

const STATUS_TONE = { selesai: 'success', proses: 'warning', konsep: 'neutral' };

// Animasi muncul saat card masuk viewport ketika di-scroll (bukan cuma sekali di awal load).
const revealUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

export default function Home() {
  const [data, setData] = useState(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    profileApi.home().then(setData).catch(() => {});
  }, []);

  if (!data) return <PageSpinner />;

  const { profile, totalProjects, totalDone, totalSkills, recentProjects, skills, services } = data;

  return (
    <div className="flex flex-col gap-20">
      {/* Hero */}
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
         
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Halo, saya <span className="text-gradient">{profile?.nama || 'AbidFakhri'}</span>
          </h1>
          {profile?.tagline && <p className="mt-4 text-lg text-sub">{profile.tagline}</p>}
          {profile?.location && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} /> {profile.location}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/projects">
              Lihat Proyek <ArrowRight size={16} />
            </Button>
            <Button as={Link} to="/services" variant="glass">
              Lihat Layanan
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-4">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-accent">
                <Github size={20} />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-accent">
                <Linkedin size={20} />
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-accent">
                <Mail size={20} />
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto"
        >
          <div className="animate-float relative mx-auto h-56 w-56 sm:h-72 sm:w-72">
            <div className="absolute inset-0 animate-glow rounded-full bg-accent/30 blur-3xl" />
            <button
              type="button"
              onClick={() => setFlipped((v) => !v)}
              aria-label="Balik foto profil"
              className="group relative block h-full w-full select-none rounded-full outline-none"
              style={{ perspective: 1200 }}
            >
              <motion.div
                className="relative h-full w-full rounded-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.45, 0, 0.55, 1] }}
              >
                {/* Sisi depan — tertutup, ajakan untuk klik */}
                <div
                  className="glass-strong absolute inset-0 flex items-center justify-center overflow-hidden rounded-full transition-colors group-hover:border-accent/40"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="flex flex-col items-center gap-2 text-accent">
                    <RotateCw size={26} className="transition-transform duration-500 group-hover:rotate-180" />
                    <span className="text-xs font-medium text-sub">Klik untuk lihat</span>
                  </div>
                </div>

                {/* Sisi belakang — foto asli */}
                <div
                  className="glass-strong absolute inset-0 overflow-hidden rounded-full"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {profile?.photo_url ? (
                    <img src={profile.photo_url} alt={profile.nama} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-accent">
                      {(profile?.nama || 'A').charAt(0)}
                    </div>
                  )}
                </div>
              </motion.div>
            </button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <GlassCard className="p-4">
              <p className="text-2xl font-bold text-ink">{totalProjects}</p>
              <p className="text-xs text-sub">Proyek</p>
            </GlassCard>
            <GlassCard className="p-4">
              <p className="text-2xl font-bold text-ink">{totalDone}</p>
              <p className="text-xs text-sub">Selesai</p>
            </GlassCard>
            <GlassCard className="p-4">
              <p className="text-2xl font-bold text-ink">{totalSkills}</p>
              <p className="text-xs text-sub">Skill</p>
            </GlassCard>
          </div>
        </motion.div>
      </section>

      {/* Bio */}
      {profile?.bio && (
        <GlassCard className="p-8" {...revealUp} transition={{ duration: 0.5 }}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Tentang Saya</h2>
          <p className="whitespace-pre-line leading-relaxed text-sub">{profile.bio}</p>
        </GlassCard>
      )}

      {/* Recent projects */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-ink">Proyek Terbaru</h2>
          <Link to="/projects" className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-light">
            Semua proyek <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentProjects?.map((project, i) => (
            <GlassCard
              key={project.id}
              hover
              className="p-6"
              {...revealUp}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-ink">{project.title}</h3>
                <Badge tone={STATUS_TONE[project.status]}>{project.status}</Badge>
              </div>
              <p className="line-clamp-2 text-sm text-sub">{project.description}</p>
              {project.tech_stack && <p className="mt-3 text-xs text-muted">{project.tech_stack}</p>}
            </GlassCard>
          ))}
          {!recentProjects?.length && <p className="text-sm text-muted">Belum ada proyek.</p>}
        </div>
      </section>

      {/* Skills preview */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-ink">Keahlian</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills?.slice(0, 6).map((skill, i) => (
            <GlassCard key={skill.id} className="p-5" {...revealUp} transition={{ duration: 0.45, delay: i * 0.06 }}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{skill.nama}</span>
                <span className="text-xs text-muted">{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-accent-dark to-accent-light"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.06 }}
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Services preview */}
      {!!services?.length && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Layanan</h2>
            <Link to="/services" className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-light">
              Semua layanan <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Link key={service.id} to={`/services/${service.id}`}>
                <GlassCard
                  hover
                  className="h-full overflow-hidden"
                  {...revealUp}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  {service.thumbnail_url && (
                    <img src={service.thumbnail_url} alt={service.nama} className="h-36 w-full object-cover" />
                  )}
                  <div className="p-5">
                    <p className="text-xs font-medium text-accent">{service.kode}</p>
                    <h3 className="mt-1 font-semibold text-ink">{service.nama}</h3>
                    {service.harga && <p className="mt-2 text-sm text-sub">{service.harga}</p>}
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}