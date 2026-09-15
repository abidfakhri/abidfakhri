import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { skillsApi } from '../api/skills.api.js';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { PageSpinner } from '../components/ui/Spinner.jsx';

export default function Skills() {
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    skillsApi.list().then(setSkills).catch(() => setSkills([]));
  }, []);

  if (!skills) return <PageSpinner />;

  const grouped = skills.reduce((acc, s) => {
    (acc[s.kategori] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Keahlian</h1>
        <p className="mt-1 text-sm text-sub">Teknologi dan tools yang saya kuasai.</p>
      </div>

      {!skills.length ? (
        <EmptyState icon={Sparkles} title="Belum ada skill" description="Skill yang ditambahkan akan tampil di sini." />
      ) : (
        Object.entries(grouped).map(([kategori, list]) => (
          <section key={kategori}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">{kategori}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((skill) => (
                <GlassCard key={skill.id} className="p-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-ink">{skill.nama}</span>
                    <span className="text-xs text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-linear-to-r from-accent-dark to-accent-light"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
