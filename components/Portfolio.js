import {
  IconSun,
  IconMoon,
  IconPencil,
  IconMail,
  IconGithub,
  IconLinkedin,
  IconUser,
  IconImage,
  IconCheck,
  IconArrow,
} from '@/lib/icons';

function statusClass(s) {
  if (s === 'Aktif') return 's-Aktif';
  if (s === 'Selesai') return 's-Selesai';
  if (s === 'Dalam progres') return 's-progres';
  return '';
}

function bg(url) {
  return url ? { backgroundImage: "url('" + url + "')" } : undefined;
}

const bioStyle = { maxWidth: 680 };

export default function Portfolio({ data, theme, onToggleTheme }) {
  const p = data.profile || {};
  const stats = data.stats || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const year = new Date().getFullYear();

  const links = [];
  if (p.email)
    links.push({ href: 'mailto:' + p.email, label: 'Email', icon: <IconMail /> });
  if (p.github)
    links.push({ href: p.github, label: 'GitHub', icon: <IconGithub /> });
  if (p.linkedin)
    links.push({ href: p.linkedin, label: 'LinkedIn', icon: <IconLinkedin /> });

  const renderLinks = () =>
    links.map((l, i) => (
      <a
        key={i}
        className={'btn ' + (i === 0 ? 'btn-primary' : 'btn-ghost')}
        href={l.href}
        target={l.href.startsWith('mailto') ? undefined : '_blank'}
        rel='noopener noreferrer'
      >
        {l.icon} {l.label}
      </a>
    ));

  return (
    <>
      <header>
        <div className='wrap nav'>
          <a href='#top' className='brand'>
            <span className='dot'>{(p.name || 'P').charAt(0).toUpperCase()}</span>{' '}
            <span>{p.name || 'Portfolio'}</span>
          </a>
          <nav className='nav-links'>
            <a href='#about'>Tentang</a>
            <a href='#skills'>Keahlian</a>
            <a href='#projects'>Proyek</a>
            <a href='#contact'>Kontak</a>
          </nav>
          <div className='nav-actions'>
            <button className='icon-btn' onClick={onToggleTheme} aria-label='Ganti tema'>
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
            <a className='icon-btn accent' href='/admin' aria-label='Edit konten'>
              <IconPencil />
            </a>
          </div>
        </div>
      </header>

      <main id='top'>
        <section className='hero'>
          <div className='wrap hero-grid'>
            <div>
              <span className='badge'>{p.role || 'Peran / Role'}</span>
              <h1>{p.name || 'Nama Kamu'}</h1>
              <p className='tagline'>
                {p.tagline || 'Tagline singkat tentang dirimu.'}
              </p>
              {links.length > 0 && <div className='cta'>{renderLinks()}</div>}
              {stats.length > 0 && (
                <div className='stats'>
                  {stats.map((s, i) => (
                    <div className='stat' key={i}>
                      <div className='n'>{s.value}</div>
                      <div className='l'>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className={'hero-photo' + (p.photoUrl ? '' : ' placeholder')}
              style={bg(p.photoUrl)}
            >
              {!p.photoUrl && (
                <div className='ph-inner'>
                  <IconUser />
                  <div>Foto</div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className='about' id='about'>
          <div className='wrap'>
            <div className='eyebrow'>Tentang</div>
            <h2>Tentang Saya</h2>
            <div style={bioStyle}>
              {p.bio ? (
                <p>{p.bio}</p>
              ) : (
                <p className='ph'>
                  Belum ada deskripsi. Klik ikon pensil di kanan atas untuk
                  menambahkan.
                </p>
              )}
            </div>
          </div>
        </section>

        <section id='skills'>
          <div className='wrap'>
            <div className='section-head'>
              <div className='eyebrow'>Keahlian</div>
              <h2>Tech stack</h2>
            </div>
            {skills.length > 0 ? (
              <div className='skill-groups'>
                {skills.map((g, i) => (
                  <div className='skill-card' key={i}>
                    <h4>{g.title}</h4>
                    <div className='tags'>
                      {(g.tags || []).map((t, j) => (
                        <span className='tag' key={j}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='empty'>
                Belum ada keahlian. Klik ikon pensil (kanan atas) untuk
                menambahkan.
              </div>
            )}
          </div>
        </section>

        <section className='projects' id='projects'>
          <div className='wrap'>
            <div className='section-head'>
              <div className='eyebrow'>Proyek</div>
              <h2>Proyek Saya</h2>
            </div>
            {projects.length > 0 ? (
              <div className='grid-3'>
                {projects.map((pr, i) => (
                  <article className='p-card' key={i}>
                    <div className='p-cover' style={bg(pr.coverUrl)}>
                      {!pr.coverUrl && <IconImage />}
                      {pr.status && (
                        <span className={'p-status ' + statusClass(pr.status)}>
                          ● {pr.status}
                        </span>
                      )}
                    </div>
                    <div className='p-body'>
                      <h3>{pr.title}</h3>
                      {pr.description && <p className='desc'>{pr.description}</p>}
                      {(pr.features || []).length > 0 && (
                        <ul className='p-feats'>
                          {pr.features.map((f, j) => (
                            <li key={j}>
                              <IconCheck /> {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      {(pr.tags || []).length > 0 && (
                        <div className='p-tags'>
                          {pr.tags.map((t, j) => (
                            <span className='p-tag' key={j}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      {pr.link && (
                        <a
                          className='p-link'
                          href={pr.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Lihat proyek <IconArrow />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className='empty'>
                Belum ada proyek. Klik ikon pensil (kanan atas) untuk
                menambahkan.
              </div>
            )}
          </div>
        </section>

        <section className='contact' id='contact'>
          <div className='wrap'>
            <div className='section-head'>
              <div className='eyebrow'>Kontak</div>
              <h2>Mari terhubung</h2>
            </div>
            {links.length > 0 ? (
              <div className='contact-btns'>{renderLinks()}</div>
            ) : (
              <p className='ph'>
                Belum ada kontak. Klik ikon pensil di kanan atas untuk
                menambahkan.
              </p>
            )}
          </div>
        </section>
      </main>

      <footer>
        <div className='wrap'>
          &copy; {year} {p.name || 'Portfolio'}
        </div>
      </footer>
    </>
  );
}
