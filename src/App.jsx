import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  Share2,
  ShieldCheck,
  TreePine,
  X,
} from 'lucide-react'
import { useLayoutEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const contact = {
  phone: '+31 6 11416527',
  phoneHref: 'tel:+31611416527',
  email: 'info@boomverzorging.nl',
  emailHref: 'mailto:info@boomverzorging.nl',
  address: 'Marslaan 28, 2957 SH Nieuw-Lekkerland',
  maps:
    'https://www.google.com/maps/search/?api=1&query=Marslaan+28+Nieuw-Lekkerland',
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/diensten', label: 'Diensten' },
  { to: '/over-ons', label: 'Over ons' },
  { to: '/contact', label: 'Contact' },
]

const services = [
  {
    slug: 'bomen-snoeien',
    title: 'Bomen snoeien',
    image: asset('images/snoeien.jpg'),
    summary:
      'Snoei op maat voor veiligheid, vitaliteit en een natuurlijke kroonvorm.',
    text: 'Snoeien is altijd een oplossing op maat. Daarbij staat de veiligheid van mens, dier en omgeving centraal. Soms is snoei noodzakelijk om overlast van te grote of laaghangende takken te beperken, in andere gevallen juist om de gezondheid en levensduur van de boom te bevorderen. Afhankelijk van de situatie passen wij verschillende snoeitechnieken toe, zoals onderhoudssnoei, begeleidingssnoei en het verwijderen van dode of gevaarlijke takken.',
  },
  {
    slug: 'bomen-verwijderen',
    title: 'Bomen verwijderen',
    image: asset('images/verwijderen.jpg'),
    summary:
      'Gecontroleerd vellen en afbreken, ook bij beperkte ruimte of bebouwing.',
    text: 'Soms is het noodzakelijk om een boom te verwijderen, bijvoorbeeld bij stormschade, ziekte of wanneer hij een risico vormt voor zijn omgeving. Wij voeren boomverwijderingen veilig en efficient uit, ook op lastig bereikbare plekken of dicht bij bebouwing. Met klimtechnieken, hijskranen of gespecialiseerd materieel zorgen wij dat de boom gecontroleerd wordt verwijderd.',
  },
  {
    slug: 'boomcontrole',
    title: 'Boomcontrole en advies',
    image: asset('images/boomcontrole.jpg'),
    summary:
      'Professionele beoordeling van vitaliteit, stabiliteit en veiligheid.',
    text: 'Een gezonde en veilige boom begint bij regelmatig toezicht. Met boomcontroles beoordelen wij vitaliteit, stabiliteit en veiligheid in uiteenlopende omgevingen. We letten op bladontwikkeling, groeivorm, ziekten, aantastingen en de staat van stam en wortels. Daarna geven we helder advies over onderhoud, snoei, bodemverbetering of vervanging.',
  },
  {
    slug: 'groeiplaats',
    title: 'Groeiplaats verbeteren',
    image: asset('images/groeiplaats.jpg'),
    summary:
      'Betere bodemstructuur, waterhuishouding en doorwortelbare ruimte.',
    text: 'De groeiplaats bepaalt de vitaliteit en levensduur van een boom. In stedelijke of verstoorde omgevingen ontstaan vaak problemen door verdichting, bestrating of beperkte wortelruimte. Wij beoordelen en verbeteren groeiplaatsen met gerichte maatregelen zoals bodemverbetering, wortelgeleiding en lucht- en waterdoorlatende lagen.',
  },
  {
    slug: 'stronken-freezen',
    title: 'Stronken freezen en houtverwerking',
    image: asset('images/stronken.jpg'),
    summary:
      'Nette afronding na kapwerk, met duurzame verwerking van hout en takken.',
    text: 'Na het kappen blijft vaak een stronk achter die hinderlijk is voor nieuwe aanplant, bestrating of gebruik van de ruimte. Met professioneel stronken frezen verwijderen wij deze resten snel en effectief, zonder grote graafwerkzaamheden. Hout en takmateriaal verwerken wij zoveel mogelijk duurzaam, bijvoorbeeld als houtsnippers, brandhout of biomassa.',
  },
]

const projects = [
  {
    title: 'Klimmend snoeien',
    image: asset('images/klimmen.jpg'),
    tag: 'Moeilijk bereikbaar',
  },
  {
    title: 'Stormschade',
    image: asset('images/stormschade.png'),
    tag: '24/7 noodhulp',
  },
  {
    title: 'Veilig werken rond bebouwing',
    image: asset('images/over-ons.jpg'),
    tag: 'Controle en uitvoering',
  },
]

const hours = [
  ['Maandag', '07:00 - 21:00'],
  ['Dinsdag', '07:00 - 21:00'],
  ['Woensdag', '07:00 - 21:00'],
  ['Donderdag', '07:00 - 21:00'],
  ['Vrijdag', '07:00 - 21:00'],
  ['Zaterdag', '07:00 - 21:00'],
  ['Zondag', 'Gesloten / niet bereikbaar'],
]

const revealSelectors = [
  '.hero-copy > *',
  '.hero-service-strip',
  '.page-hero-copy > *',
  '.page-hero-card',
  '.home-services-head > *',
  '.service-lane',
  '.home-about-media',
  '.home-about-copy > *',
  '.project-card',
  '.cta-band > *',
  '.section-intro',
  '.section-intro > *',
  '.services-index-copy > *',
  '.service-slide-card',
  '.service-detail',
  '.service-detail h2',
  '.service-detail p',
  '.split-copy > *',
  '.split-copy li',
  '.values-panel',
  '.contact-intro > *',
  '.contact-action',
  '.hours-panel',
  '.quote-form',
  '.quote-form > *',
  '.contact-cards a',
  '.legal-section > *',
  '.legal-section li',
  '.footer-grid > div',
].join(',')

function getRevealType(element) {
  if (
    element.matches(
      '.home-about-media, .service-lane, .project-card, .page-hero-card',
    )
  ) {
    return 'reveal-media'
  }

  if (
    element.matches(
      '.hero-service-strip, .service-slide-card, .service-detail, .values-panel, .contact-action, .hours-panel, .quote-form, .contact-cards a, .footer-grid > div',
    )
  ) {
    return 'reveal-card'
  }

  return 'reveal-text'
}

function ScrollReveal() {
  const location = useLocation()

  useLayoutEffect(() => {
    let observer
    let firstFrame
    let secondFrame
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const elements = [...document.querySelectorAll(revealSelectors)]

    elements.forEach((element, index) => {
      element.classList.remove('is-visible')
      element.classList.add('reveal-on-scroll', getRevealType(element))
      element.style.setProperty(
        '--reveal-delay',
        `${Math.min(index % 7, 6) * 48}ms`,
      )

      if (prefersReducedMotion) {
        element.classList.add('is-visible')
      }
    })

    if (prefersReducedMotion) {
      return undefined
    }

    const revealVisibleElements = () => {
      const viewportHeight = window.innerHeight

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < viewportHeight * 0.94 && rect.bottom > 0

        if (isVisible) {
          element.classList.add('is-visible')
        }
      })
    }

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        revealVisibleElements()

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              entry.target.classList.toggle('is-visible', entry.isIntersecting)
            })
          },
          {
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.12,
          },
        )

        elements.forEach((element) => observer.observe(element))
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
      observer?.disconnect()
      elements.forEach((element) => {
        element.classList.remove(
          'reveal-on-scroll',
          'reveal-text',
          'reveal-card',
          'reveal-media',
          'is-visible',
        )
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [location.pathname])

  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <img className="brand-icon" src={asset('images/Icon-wit.png')} alt="" />
          <span>
            <strong>Deelen</strong>
            <small>Boomverzorging</small>
          </span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label="Menu openen"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            className="nav-cta"
            to={contact.phoneHref}
            onClick={() => setMenuOpen(false)}
          >
            Bel direct
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link className="footer-brand" to="/">
            <img className="brand-icon" src={asset('images/Icon-wit.png')} alt="" />
            <span>
              <strong>Deelen</strong>
              <small>Boomverzorging</small>
            </span>
          </Link>
          <p>
            Wij koesteren bomen van wortel tot kroon, creeren gezonde
            leefruimtes en verbinden natuur met stedelijk leven.
          </p>
          <div className="social-links">
            <a href={contact.emailHref} aria-label="E-mail">
              <Mail size={18} />
            </a>
            <a href={contact.phoneHref} aria-label="Telefoon">
              <Phone size={18} />
            </a>
            <Link to="/" aria-label="Social">
              <Share2 size={18} />
            </Link>
          </div>
        </div>

        <div>
          <h3>Diensten</h3>
          {services.map((service) => (
            <Link key={service.slug} to={`/diensten#${service.slug}`}>
              {service.title}
            </Link>
          ))}
        </div>

        <div>
          <h3>Pagina's</h3>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
          <Link to="/privacy-verklaring">Privacy verklaring</Link>
        </div>

        <div>
          <h3>Contact gegevens</h3>
          <a
            className="footer-address"
            href={contact.maps}
            target="_blank"
            rel="noreferrer"
          >
            {contact.address}
          </a>
          <a href={contact.emailHref}>Email: {contact.email}</a>
          <a href={contact.phoneHref}>Tel: {contact.phone}</a>
        </div>
      </div>
      <div className="copyright">
        <span>© {currentYear} Deelen Boomverzorging</span>
        <a href="https://devtec.nl" target="_blank" rel="noreferrer">
          Ontworpen door Devtec
        </a>
      </div>
    </footer>
  )
}

function ButtonLink({ to, children, variant = 'primary' }) {
  return (
    <Link className={`button ${variant}`} to={to}>
      {children}
      <ArrowRight size={18} />
    </Link>
  )
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="hero-section">
        <img
          className="hero-bg"
          src={asset('images/over-ons.jpg')}
          alt="Boomverzorging in uitvoering"
        />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span>Nieuw-Lekkerland</span>
              <span>Sinds 2016</span>
              <span>24/7 stormschade</span>
            </div>
            <h1>Boomzorg met grip op hoogte en risico</h1>
            <p>
              Vakkundig snoeien, gecontroleerd verwijderen en helder advies voor
              bomen die veilig, vitaal en passend in hun omgeving moeten blijven.
            </p>
            <div className="hero-actions">
              <ButtonLink to="/contact">Offerte aanvragen</ButtonLink>
              <ButtonLink to="/diensten" variant="secondary">
                Bekijk diensten
              </ButtonLink>
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-side-top">
              <TreePine size={25} />
              <span>Van wortel tot kroon</span>
            </div>
            <p>
              Moeilijke plek? Smalle tuin? Boom boven bebouwing? We maken eerst
              een plan en voeren daarna gecontroleerd uit.
            </p>
            <a href={contact.phoneHref}>
              <Phone size={18} />
              Spoed: {contact.phone}
            </a>
          </div>

          <div className="hero-service-strip">
            {services.slice(0, 4).map((service, index) => (
              <Link key={service.slug} to={`/diensten#${service.slug}`}>
                <span>0{index + 1}</span>
                <strong>{service.title}</strong>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>

        </div>
      </section>

      <HomeServices />
      <HomeAbout />
      <HomeProjects />

      <CtaBand />
    </>
  )
}

function HomeServices() {
  return (
    <section className="home-services">
      <div className="home-services-head">
        <span className="eyebrow">Wat we doen</span>
        <h2>Boomzorg met controle</h2>
        <p>
          Geen losse checklist, maar de juiste volgorde: beoordelen, veilig
          werken, netjes afronden en de groeiplaats waar mogelijk versterken.
        </p>
      </div>

      <div className="service-lanes">
        {services.slice(0, 4).map((service, index) => (
          <Link
            className="service-lane"
            key={service.slug}
            to={`/diensten#${service.slug}`}
          >
            <img src={service.image} alt="" />
            <div>
              <span>0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </div>
            <ArrowRight size={20} />
          </Link>
        ))}
      </div>
    </section>
  )
}

function HomeAbout() {
  return (
    <section className="home-about">
      <div className="home-about-media">
        <img src={asset('images/klimmen.jpg')} alt="Boomverzorger aan het werk" />
        <div className="about-year-badge">
          <span>Sinds</span>
          <strong>2016</strong>
          <small>Specialistische boomverzorging</small>
        </div>
      </div>
      <div className="home-about-copy">
        <span className="eyebrow">Over ons</span>
        <h2>Ervaren boomzorg voor plekken waar precisie telt.</h2>
        <p>
          Sinds 2016 verzorgt, snoeit en verwijdert Deelen Boomverzorging bomen
          op plekken waar overzicht en controle nodig zijn. In tuinen, bij
          bebouwing of op moeilijk bereikbare locaties werken we met een rustige
          aanpak: eerst kijken wat de boom en omgeving vragen, daarna pas
          uitvoeren.
        </p>
        <div className="about-points">
          <div>
            <CheckCircle2 size={19} />
            <span>Klimtechniek voor krappe en lastig bereikbare plekken</span>
          </div>
          <div>
            <CheckCircle2 size={19} />
            <span>Advies met aandacht voor veiligheid en boomgezondheid</span>
          </div>
          <div>
            <CheckCircle2 size={19} />
            <span>Nette oplevering met verwerking van hout en takmateriaal</span>
          </div>
        </div>
        <ButtonLink to="/over-ons">Lees meer over ons</ButtonLink>
      </div>
    </section>
  )
}

function HomeProjects() {
  return (
    <section className="home-projects">
      <div className="home-projects-head">
        <span className="eyebrow">Projecten</span>
        <h2>Werk in beeld</h2>
        <p>
          Een indruk van hoogtewerk, noodsituaties en gecontroleerde uitvoering
          in de buurt van bebouwing.
        </p>
      </div>
      <ProjectGrid />
    </section>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        title="Onze diensten"
        text="Van onderhoudssnoei tot complete verwijdering: elke boom vraagt om een aanpak die technisch klopt en veilig uitvoerbaar is."
        image={asset('images/groeiplaats.jpg')}
        chips={['Snoeien', 'Verwijderen', 'Boomcontrole']}
        card={{
          icon: TreePine,
          title: 'De juiste ingreep per boom',
          text: 'We beoordelen eerst veiligheid, groeiplaats en omgeving. Daarna kiezen we de techniek die past bij de boom en de ruimte eromheen.',
        }}
      />
      <section className="section">
        <div className="services-slider-section">
          <div className="services-index-copy">
            <span className="eyebrow">Overzicht</span>
            <h2>Alles voor veilige en vitale bomen</h2>
            <p>
              Kies direct een dienst of scroll verder voor toelichting. Elke
              opdracht start met een beoordeling van boom, omgeving en risico.
            </p>
          </div>
          <div className="services-slider">
            <div className="services-slider-track">
              {[...services, ...services].map((service, index) => (
                <a
                  className="service-slide-card"
                  key={`${service.slug}-${index}`}
                  href={`#${service.slug}`}
                >
                  <span>0{(index % services.length) + 1}</span>
                  <strong>{service.title}</strong>
                  <small>{service.summary}</small>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="service-detail-list">
          {services.map((service, index) => (
            <article className="service-detail" id={service.slug} key={service.slug}>
              <img src={service.image} alt="" />
              <div>
                <span className="eyebrow">0{index + 1} / Dienst</span>
                <h2>{service.title}</h2>
                <p>{service.text}</p>
                <Link to="/contact" className="service-feature-link">
                  Bespreek deze dienst
                  <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero
        title="Over Deelen Boomverzorging"
        text="Uw partner in duurzame buitenruimte, met aandacht voor veiligheid, kwaliteit en gezonde bomen."
        image={asset('images/klimmen.jpg')}
        chips={['Sinds 2016', 'Klimtechniek', 'Vakmanschap']}
        card={{
          icon: ShieldCheck,
          title: 'Ervaring op lastige plekken',
          text: 'Van krappe tuinen tot bomen boven bebouwing: we werken rustig, gecontroleerd en met aandacht voor wat de boom nodig heeft.',
        }}
      />
      <section className="split-section">
        <div className="split-copy">
          <span className="eyebrow">Sinds 2016</span>
          <h2>Voor iedere klus een zorgvuldige aanpak</h2>
          <p>
            Deelen Boomverzorging zet zich in voor het verzorgen, snoeien en
            verwijderen van bomen. Met veel ervaring in klimmend snoeien en
            afbreken op moeilijk bereikbare plekken zorgen wij voor een veilige
            en vakkundige aanpak.
          </p>
          <p>
            Soms is het een uitdaging om de wens van de klant te combineren met
            wat het beste is voor de boom. Wij zoeken altijd naar een passende
            balans, waarbij klanttevredenheid, kwaliteit en vakmanschap de basis
            vormen.
          </p>
        </div>
        <div className="values-panel">
          <div className="values-track">
            {[
              ['Duurzaam', 'Oplossingen die recht doen aan boom en omgeving.'],
              ['Veilig', 'Gecontroleerde uitvoering, ook in krappe ruimtes.'],
              ['Vakkundig', 'Kennis, ervaring en duidelijke communicatie.'],
              ['Duurzaam', 'Oplossingen die recht doen aan boom en omgeving.'],
              ['Veilig', 'Gecontroleerde uitvoering, ook in krappe ruimtes.'],
              ['Vakkundig', 'Kennis, ervaring en duidelijke communicatie.'],
            ].map(([title, text], index) => {
              const Icon =
                index % 3 === 0 ? TreePine : index % 3 === 1 ? ShieldCheck : Leaf
              return (
                <div className="value-slide" key={`${title}-${index}`}>
                  <Icon />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="section muted">
        <SectionIntro
          eyebrow="Missie"
          title="Levendige groene omgevingen creeren"
          text="Onze missie is het creeren van buitenruimtes die rust, schoonheid en langdurig genot brengen voor iedere klant."
        />
        <ProjectGrid />
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact opnemen"
        text="We denken graag met je mee over advies, planning of een kennismaking op maat."
        image={asset('images/contact.jpg')}
        chips={['Bel direct', 'Offerte aanvragen', 'Nieuw-Lekkerland']}
        card={{
          icon: Phone,
          title: contact.phone,
          text: 'Bij stormschade of een acute onveilige situatie is bellen de snelste route. Voor planning en offertes kun je ook mailen.',
          href: contact.phoneHref,
        }}
      />
      <section className="contact-layout">
        <div className="contact-intro">
          <span className="eyebrow">Bereikbaarheid</span>
          <h2>Bel direct bij spoed, mail voor planning of een offerte.</h2>
          <p>
            Bij stormschade of een acute onveilige situatie is telefonisch
            contact het snelst. Voor regulier boomwerk kun je ook het formulier
            gebruiken; voeg gerust foto’s of context toe in je bericht.
          </p>
        </div>

        <div className="contact-action-grid">
          <a className="contact-action primary" href={contact.phoneHref}>
            <Phone />
            <span>Direct bellen</span>
            <strong>{contact.phone}</strong>
          </a>
          <a className="contact-action" href={contact.emailHref}>
            <Mail />
            <span>E-mail</span>
            <strong>{contact.email}</strong>
          </a>
          <a
            className="contact-action"
            href={contact.maps}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin />
            <span>Locatie</span>
            <strong>{contact.address}</strong>
          </a>
        </div>

        <div className="contact-main">
          <div className="hours-panel">
            <h3>
              <Clock size={18} />
              Bereikbaar op deze tijden
            </h3>
            {hours.map(([day, time]) => (
              <div key={day}>
                <span>{day}</span>
                <strong>{time}</strong>
              </div>
            ))}
          </div>

          <form className="quote-form" action={contact.emailHref} method="post">
            <h2>Offerte aanvragen</h2>
            <p>
              Beschrijf kort de situatie, locatie en wat je graag wilt laten
              doen. Dan kunnen we gericht reageren.
            </p>
            <label>
              Naam
              <input
                name="naam"
                type="text"
                autoComplete="name"
                required
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <label>
              Bericht
              <textarea name="bericht" rows="6" required />
            </label>
            <button type="submit">
              Versturen
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

function PrivacyPage() {
  return (
    <section className="legal-section privacy-page">
      <span className="eyebrow">Privacy</span>
      <h1>Privacy verklaring</h1>

      <article>
        <h2>1. Algemeen</h2>
        <p>
          Wij hechten veel waarde aan de bescherming van jouw privacy en
          persoonsgegevens. Op deze pagina leggen we uit welke gegevens we
          verzamelen, waarom we dat doen en hoe we hiermee omgaan. Deze
          privacyverklaring is van toepassing op het gebruik van de website en
          het contactformulier op DeelenBoomverzorging.
        </p>
      </article>

      <article>
        <h2>2. Welke gegevens verzamelen wij?</h2>
        <p>
          Wanneer je het contactformulier invult, verzamelen wij de volgende
          gegevens:
        </p>
        <ul>
          <li>Naam</li>
          <li>E-mailadres</li>
          <li>Eventueel telefoonnummer, indien vermeld in het bericht</li>
          <li>Het bericht dat je naar ons stuurt</li>
        </ul>
        <p>
          Daarnaast maakt onze website gebruik van cookies waarmee we technische
          en analytische gegevens verzamelen over jouw bezoek.
        </p>
      </article>

      <article>
        <h2>3. Waarom verzamelen wij deze gegevens?</h2>
        <p>Wij gebruiken jouw gegevens om:</p>
        <ul>
          <li>Contact met je op te nemen naar aanleiding van je bericht</li>
          <li>Je een offerte of antwoord op maat te kunnen bieden</li>
          <li>
            Onze website te optimaliseren op basis van geanonimiseerde
            gebruiksstatistieken
          </li>
        </ul>
        <p>
          Wij gebruiken je gegevens niet voor marketingdoeleinden, tenzij je daar
          expliciet toestemming voor hebt gegeven.
        </p>
      </article>

      <article>
        <h2>4. Cookies</h2>
        <p>Onze website maakt gebruik van:</p>
        <ul>
          <li>
            <strong>Functionele cookies:</strong> zorgen ervoor dat de website
            goed werkt, zoals formulierverzending.
          </li>
          <li>
            <strong>Analytische cookies:</strong> geven inzicht in het gebruik
            van de website, bijvoorbeeld via Google Analytics. Deze gegevens
            zijn volledig geanonimiseerd.
          </li>
        </ul>
      </article>

      <article>
        <h2>5. Delen van gegevens</h2>
        <p>
          Wij delen jouw gegevens <strong>niet</strong> met derden, tenzij dit
          noodzakelijk is voor de uitvoering van onze diensten of wanneer wij
          daartoe wettelijk verplicht zijn, zoals bij misbruik of fraude.
        </p>
      </article>

      <article>
        <h2>6. Inzage, wijziging of verwijdering</h2>
        <p>
          Je hebt het recht om je persoonsgegevens in te zien, te laten
          corrigeren of te laten verwijderen. Neem hiervoor contact met ons op
          via:
        </p>
        <ul>
          <li>
            <strong>E-mail:</strong> {contact.email}
          </li>
          <li>
            <strong>Telefoon:</strong> {contact.phone}
          </li>
          <li>
            <strong>Adres:</strong> 2957 SH, Nieuw-Lekkerland
          </li>
        </ul>
      </article>

      <article>
        <h2>7. Beveiliging</h2>
        <p>
          Wij nemen passende maatregelen om misbruik, verlies, onbevoegde
          toegang of ongewenste openbaarmaking van jouw gegevens tegen te gaan.
        </p>
      </article>
    </section>
  )
}

function PageHero({ title, text, image, chips, card }) {
  const CardIcon = card?.icon ?? TreePine

  return (
    <section className="page-hero">
      <img src={image} alt="" />
      <div className="page-hero-inner">
        <div className="page-hero-copy">
          <div className="hero-kicker">
            {(chips ?? ['Deelen Boomverzorging', 'Nieuw-Lekkerland']).map(
              (chip) => (
                <span key={chip}>{chip}</span>
              ),
            )}
          </div>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        {card?.href ? (
          <a className="page-hero-card page-hero-card-link" href={card.href}>
            <CardIcon size={24} />
            <strong>{card.title}</strong>
            <span>{card.text}</span>
          </a>
        ) : (
          <div className="page-hero-card">
            <CardIcon size={24} />
            <strong>{card?.title}</strong>
            <span>{card?.text}</span>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.title}>
          <img src={project.image} alt="" />
          <div>
            <span>{project.tag}</span>
            <h3>{project.title}</h3>
          </div>
        </article>
      ))}
    </div>
  )
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div>
        <span className="eyebrow">24/7 noodhulp</span>
        <h2>Snel en veilig ingrijpen bij stormschade</h2>
        <p>
          Van omgewaaide bomen tot uitgewaaide kronen: bij acute situaties is
          telefonisch contact de kortste route.
        </p>
      </div>
      <ButtonLink to="/contact">Contact opnemen</ButtonLink>
    </section>
  )
}

function App() {
  const siteImages = {
    '--image-contact': `url("${asset('images/contact.jpg')}")`,
    '--image-storm': `url("${asset('images/stormschade.png')}")`,
  }

  return (
    <div className="site-shell" style={siteImages}>
      <ScrollToTop />
      <ScrollReveal />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diensten" element={<ServicesPage />} />
          <Route path="/over-ons" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-verklaring" element={<PrivacyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
