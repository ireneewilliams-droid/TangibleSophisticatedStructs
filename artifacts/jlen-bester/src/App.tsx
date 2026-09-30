import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Download, ExternalLink, Mail, Menu, X } from 'lucide-react';

const navigation = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
];

const experience = [
  {
    title: 'Immigration Summer Clerk',
    organization: 'Law Office of Manuel Solis',
    location: 'Houston, TX',
    date: 'June 2024 to May 2026',
    bullets: [
      'Drafted and filed appeals, petitions, motions, and briefs before a federal administrative agency, following its procedural rules with precision.',
      'Conducted legal research using Westlaw and LexisNexis to identify controlling rules and build case arguments.',
      'Prepared case summaries and internal memoranda that attorneys used to plan strategy.',
    ],
  },
  {
    title: 'Board of Student Advisors',
    organization: 'Southern University Law Center',
    location: 'Baton Rouge, LA',
    date: 'Aug 2024 to May 2026',
    bullets: [
      'Advised first-year law students on substantive law, legal writing, and exam preparation through office hours and review of writing assignments.',
      'Partnered with faculty to prepare instructional materials.',
    ],
  },
  {
    title: 'Legal Writer / Case Briefer',
    organization: 'Law Office of Manuel Solis',
    location: 'Houston, TX',
    date: 'Aug 2021 to Sept 2023',
    bullets: [
      'Analyzed case files to identify key facts, legal issues, and controlling precedent for attorneys preparing for court proceedings.',
      'Conducted research and prepared case briefs, memoranda, and other legal documents.',
    ],
  },
];

const skillGroups = [
  {
    number: '01',
    title: 'Legal',
    items: ['Legal research and writing', 'Westlaw', 'LexisNexis', 'Case management', 'Administrative / regulatory procedure', 'Document preparation', 'Client advocacy'],
  },
  {
    number: '02',
    title: 'Communications',
    items: ['Message development', 'Press materials', 'Web and social media management', 'Public-facing writing and editing', 'Presentation and briefing materials'],
  },
  {
    number: '03',
    title: 'Technology',
    items: ['Microsoft Word', 'PowerPoint', 'Excel', 'Familiar with AI-enabled research and writing tools'],
    note: 'IBM SkillsBuild (Credly) certifications: AI Applications, Machine Learning Methods & Tools, AI Fundamentals, and Data Analytics for Machine Learning.',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = navigation.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.1, 0.3] },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -35px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = (id?: string) => {
    setMenuOpen(false);
    if (id) setActiveSection(id);
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main" data-testid="link-skip-content">Skip to content</a>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="#top" className="wordmark" aria-label="J'Len Bester, back to top" onClick={() => closeMenu('')} data-testid="link-brand">
            <span className="wordmark-mark" aria-hidden="true">JB</span>
            <span className="wordmark-text">J&apos;Len Bester<span>, J.D.</span></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={() => closeMenu(item.id)}
                data-testid={`link-nav-${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-contact" href="mailto:JLenBester722@gmail.com" data-testid="link-header-email">
            Get in touch <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
          </button>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => closeMenu(item.id)}
              data-testid={`link-mobile-${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-heading">
          <div className="hero-monogram" aria-hidden="true">JB</div>
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="eyebrow"><span className="line" />Legal &amp; Communications</div>
              <h1 className="hero-title" id="hero-heading" data-testid="text-hero-name"><span>J&apos;Len</span>{' '}<span>Bester, J.D.</span></h1>
              <p className="hero-subtitle" data-testid="text-hero-subtitle">Communications &amp; Legal Professional | San Antonio, TX</p>
              <div className="hero-rule" aria-hidden="true" />
              <p className="hero-summary">Legal research, public-facing writing, and stakeholder communication across administrative and regulatory law.</p>
              <div className="hero-actions">
                <a href="/resume.pdf" className="button button-primary" download data-testid="link-download-resume">
                  Download Resume <Download size={15} strokeWidth={1.7} aria-hidden="true" />
                </a>
                <a href="mailto:JLenBester722@gmail.com" className="button button-outline" data-testid="link-hero-contact">
                  Contact Me <ArrowRight size={15} strokeWidth={1.7} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-links">
                <a href="mailto:JLenBester722@gmail.com" data-testid="link-hero-email"><Mail size={14} strokeWidth={1.6} aria-hidden="true" /> Email</a>
                <a href="https://www.linkedin.com/in/jlenbester" target="_blank" rel="noopener noreferrer" data-testid="link-hero-linkedin">LinkedIn <ExternalLink size={12} strokeWidth={1.6} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="hero-visual">
              <img
                className="hero-portrait"
                src={`${import.meta.env.BASE_URL}jlen-bester-headshot-clean.png`}
                alt="J'Len Bester smiling in a black blazer and white blouse"
                width="899"
                height="1214"
                fetchPriority="high"
              />
              <div className="hero-side-label" aria-hidden="true">San Antonio, Texas</div>
            </div>
          </div>
          <div className="hero-bottom" aria-hidden="true">
            <div className="container"><span>Scroll to explore <ArrowDown size={11} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 5 }} /></span><span>Research · Writing · Communication</span></div>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-heading">
          <div className="container about-grid">
            <div className="about-heading-wrap reveal">
              <div className="eyebrow"><span className="line" />01 / Profile</div>
              <h2 className="section-heading" id="about-heading">About.</h2>
            </div>
            <div className="about-copy reveal">
              <p data-testid="text-about-summary">Juris Doctor graduate (May 2026) with a Bachelor of Science in Mass Communications and four years of experience in administrative and regulatory law. Skilled at legal research, public-facing writing, and stakeholder communication. Texas Bar Examination results pending. Comfortable applying AI-enabled tools to research and writing workflows.</p>
              <div className="about-index" aria-label="Professional focus">
                <div><strong>Juris Doctor</strong><small>May 2026</small></div>
                <div><strong>San Antonio</strong><small>Texas</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section experience" id="experience" aria-labelledby="experience-heading">
          <div className="container">
            <div className="section-header reveal">
              <div><div className="eyebrow"><span className="line" />02 / Professional work</div><h2 className="section-heading" id="experience-heading">Experience.</h2></div>
              <p className="section-intro">Research, drafting, and advisory work in legal and academic settings.</p>
            </div>
            <div className="experience-list">
              {experience.map((role, index) => (
                <article className="experience-item reveal" key={role.title} data-testid={`item-experience-${index}`}>
                  <div className="experience-date">{role.date}</div>
                  <div className="experience-body">
                    <div>
                      <h3>{role.title}</h3>
                      <p className="organization">{role.organization}</p>
                      <div className="location">{role.location}</div>
                    </div>
                    <ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section education" id="education" aria-labelledby="education-heading">
          <div className="container education-layout">
            <div className="reveal">
              <div className="eyebrow"><span className="line" />03 / Academic foundation</div>
              <h2 className="section-heading" id="education-heading">Education.</h2>
              <p className="section-intro">A foundation in both law and mass communications.</p>
            </div>
            <div className="education-list">
              <article className="education-item reveal" data-testid="item-education-sulc">
                <div className="education-item-top"><h3>Southern University Law Center</h3><span className="education-date">May 2026</span></div>
                <p className="degree">Doctor of Jurisprudence</p>
                <p className="education-place">Baton Rouge, Louisiana</p>
                <ul>
                  <li>Senior Editor, Journal of International Law, Business, and Policy.</li>
                  <li>Participant, AbbVie Legal Academy for Intellectual Property.</li>
                </ul>
              </article>
              <article className="education-item reveal" data-testid="item-education-tsu">
                <div className="education-item-top"><h3>Tennessee State University</h3><span className="education-date">December 2020</span></div>
                <p className="degree">Bachelor of Science in Mass Communications</p>
                <p className="education-place">Nashville, TN</p>
                <ul>
                  <li>Membership Director, Phi Alpha Delta Pre Law.</li>
                  <li>President, Alpha Phi Omega National Service Fraternity, Inc.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section skills" id="skills" aria-labelledby="skills-heading">
          <div className="container">
            <div className="section-header reveal">
              <div><div className="eyebrow"><span className="line" />04 / Capabilities</div><h2 className="section-heading" id="skills-heading">Skills.</h2></div>
              <p className="section-intro">Tools and practices across legal work, communications, and technology.</p>
            </div>
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <div className="skill-group reveal" key={group.title} data-testid={`group-skills-${group.title.toLowerCase()}`}>
                  <span className="skill-number">{group.number} /</span>
                  <h3>{group.title}</h3>
                  <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                  {group.note && <p className="skill-note">{group.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section leadership" id="leadership" aria-labelledby="leadership-heading">
          <div className="container leadership-layout">
            <div className="reveal">
              <div className="eyebrow"><span className="line" />05 / Beyond the office</div>
              <h2 className="section-heading" id="leadership-heading">Leadership.</h2>
              <div className="leadership-org">
                <strong>Southwest Region Black Law Students Association (SWBLSA)</strong>
                <span>Remote</span>
              </div>
            </div>
            <div className="leadership-list">
              <article className="leadership-item reveal" data-testid="item-leadership-communications">
                <time>Apr 2024 to Apr 2025</time>
                <h3>Director of Communications</h3>
                <p>Wrote and distributed newsletters and press releases; managed the organization&apos;s website and social media channels; developed communications strategy to grow visibility and engagement.</p>
              </article>
              <article className="leadership-item reveal" data-testid="item-leadership-community">
                <time>Apr 2025 to Present</time>
                <h3>Director of Community Service</h3>
                <p>Plans and executes community outreach events; shapes engagement strategy to expand the organization&apos;s reach.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-heading">
          <div className="container">
            <div className="reveal">
              <div className="eyebrow"><span className="line" />06 / Contact</div>
              <h2 className="contact-heading" id="contact-heading">Let&apos;s connect.</h2>
            </div>
            <div className="contact-grid reveal">
              <div className="contact-method"><small>Email</small><a href="mailto:JLenBester722@gmail.com" data-testid="link-contact-email">JLenBester722@gmail.com <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" /></a></div>
              <div className="contact-method"><small>Phone</small><a href="tel:+17863013626" data-testid="link-contact-phone">786.301.3626 <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" /></a></div>
              <div className="contact-method"><small>Connect</small><a href="https://www.linkedin.com/in/jlenbester" target="_blank" rel="noopener noreferrer" data-testid="link-contact-linkedin">LinkedIn <ExternalLink size={15} strokeWidth={1.5} aria-hidden="true" /></a></div>
            </div>
            <footer className="footer">
              <span>J&apos;Len Bester, J.D. <span aria-hidden="true">·</span> San Antonio, TX</span>
              <a href="#top" data-testid="link-back-to-top">Back to top ↑</a>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;