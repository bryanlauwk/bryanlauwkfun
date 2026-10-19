import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import workbench from "@/assets/studio-workbench.jpg";
import { WHATSAPP } from "@/components/StudioChrome";

const links = [
  { label: "Email", href: "mailto:bryanlauwk@gmail.com", Icon: Mail, external: false },
  { label: "WhatsApp", href: WHATSAPP, Icon: MessageCircle, external: true },
  { label: "GitHub", href: "https://github.com/bryanlauwk", Icon: Github, external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/bryanlauwk", Icon: Linkedin, external: true },
];

export default function StudioContactFooter() {
  return <footer id="contact" className="maker-footer" aria-labelledby="contact-heading">
    <div className="maker-footer-scene" aria-hidden="true"><img src={workbench} alt="" width={1536} height={1024} loading="lazy" /></div>
    <div className="maker-footer-main">
      <div className="maker-invitation"><h2 id="contact-heading">Have a weird idea?<br /><strong>Good.</strong></h2><p>Let’s make something interesting. <span aria-hidden="true">⟶</span></p></div>
      <nav className="maker-socials" aria-label="Contact Bryan"><p>Find me at</p><div>{links.map(({ label, href, Icon, external }) => <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={`${label === "Email" ? "Email Bryan" : label === "WhatsApp" ? "Chat on WhatsApp" : label}${external ? " (opens in a new tab)" : ""}`}><span className="maker-social-icon"><Icon size={21} strokeWidth={1.7} aria-hidden="true" /></span><span>{label}</span></a>)}</div></nav>
    </div>
    <div className="maker-footer-base"><a href="/">881230.studio · by Bryan Lau Wai Kit</a><span>Workbench artwork · AI concept</span><a href="#work">Back to work <ArrowUpRight size={13} aria-hidden="true" /></a></div>
  </footer>;
}
