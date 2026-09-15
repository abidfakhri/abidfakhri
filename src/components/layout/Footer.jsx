import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profileApi } from '../../api/profile.api.js';

export function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    profileApi.get().then(setProfile).catch(() => {});
  }, []);

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-8 text-center">
        <p className="text-sm text-sub">
          &copy; {new Date().getFullYear()} {profile?.nama || 'AbidFakhri'}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-accent">
              <Github size={18} />
            </a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-accent">
              <Linkedin size={18} />
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-accent">
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
