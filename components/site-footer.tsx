import { companyLinks, contact, destinations, legalLinks, social } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <a href="/" className="brand-logo" style={{ marginBottom: "1.25rem" }}>
              <img src="/brand/eduvert-logo.png" alt="Eduvert Overseas Education" />
            </a>
            <p className="quiet">{contact.address}</p>
            <p className="quiet" style={{ marginTop: "0.8rem" }}>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              <br />
              <a href={contact.emailHref}>{contact.email}</a>
            </p>
          </div>
          <div>
            <p className="footer-label">Destinations</p>
            <ul>
              {destinations.map((destination) => (
                <li key={destination.href}>
                  <a href={destination.href}>{destination.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-label">Eduvert</p>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              {social.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <p style={{ margin: 0 }}>Eduvert Study Abroad</p>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem 1.2rem" }}>
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
