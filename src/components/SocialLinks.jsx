import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faGithub, faLinkedin, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const LINKS = [
  { label: "WhatsApp", href: "https://wa.me/5521986140005", icon: faWhatsapp },
  { label: "GitHub", href: "https://github.com/sammyfreitas", icon: faGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tony-s-freitas", icon: faLinkedin },
  { label: "Instagram", href: "https://instagram.com/anthony_tijuduke", icon: faInstagram },
  { label: "Facebook", href: "https://facebook.com//anthonyfreitas78", icon: faFacebook },
  { label: "Portfólio", href: "https://sammyfreitas.github.io/portfolio-v2/", icon: faGlobe },
  { label: "Portfólio Old", href: "https://sammyfreitas.github.io/portfolioSite/", icon: faGlobe },
];

export default function SocialLinks() {
  return (
    <div className="socialLinks" aria-label="Redes sociais">
      {LINKS.map((l) => (
        <a key={l.href} className="socialIcon" href={l.href} target="_blank" rel="noreferrer" title={l.label}>
          <FontAwesomeIcon icon={l.icon} />
        </a>
      ))}
    </div>
  );
}
