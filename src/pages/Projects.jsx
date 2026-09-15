import { useEffect, useState } from 'react';
import { ExternalLink, FolderKanban, Github } from 'lucide-react';
import { projectsApi } from '../api/projects.api.js';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { PageSpinner } from '../components/ui/Spinner.jsx';

const STATUSES = ['selesai', 'proses', 'konsep'];
const STATUS_TONE = { selesai: 'success', proses: 'warning', konsep: 'neutral' };

export default function Projects() {
  const [projects, setProjects] = useState(null);
  const [filter, setFilter] = useState('');

  const load = (status) => {
    setProjects(null);
    projectsApi.list(status || undefined).then(setProjects).catch(() => setProjects([]));
  };

  useEffect(() => load(filter), [filter]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Proyek</h1>
        <p className="mt-1 text-sm text-sub">Kumpulan proyek yang pernah dan sedang saya kerjakan.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip label="Semua" active={filter === ''} onClick={() => setFilter('')} />
        {STATUSES.map((s) => (
          <FilterChip key={s} label={s} active={filter === s} onClick={() => setFilter(s)} />
        ))}
      </div>

      {!projects ? (
        <PageSpinner />
      ) : !projects.length ? (
        <EmptyState icon={FolderKanban} title="Belum ada proyek" description="Proyek yang ditambahkan akan muncul di sini." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <GlassCard key={project.id} hover className="flex flex-col p-6">
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-ink">{project.title}</h3>
                <Badge tone={STATUS_TONE[project.status]}>{project.status}</Badge>
              </div>
              <p className="flex-1 text-sm text-sub">{project.description}</p>
              {project.tech_stack && <p className="mt-3 text-xs text-muted">{project.tech_stack}</p>}

              <div className="mt-4 flex items-center gap-3">
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-light">
                    <ExternalLink size={13} /> Demo
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-medium text-sub hover:text-ink">
                    <Github size={13} /> Kode
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
        active ? 'border-accent/50 bg-accent/15 text-accent-light' : 'border-border text-sub hover:border-border-strong hover:text-ink'
      }`}
    >
      {label}
    </button>
  );
}
