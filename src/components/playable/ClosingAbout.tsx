import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteSettings";

export function ClosingAbout() {
  const { content } = useSiteContent();
  const socials = [
    { href: content("about.githubUrl"), Icon: Github, label: "GitHub" },
    { href: content("about.twitterUrl"), Icon: Twitter, label: "Twitter / X" },
    { href: content("about.linkedinUrl"), Icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <section id="about" className="cp-section cp-about" aria-labelledby="about-heading">
      <div className="cp-shell cp-about-grid">
        <div className="cp-about-main">
          <p className="cp-kicker">GOT AN OBJECT WITH NO PERSONALITY?</p>
          <h2 id="about-heading">LET&apos;S GIVE IT<br />BAD IDEAS.</h2>
          <p>
            Bring a strange question, an ordinary object or a brief that feels a little too sensible. I prototype playful interactions across browser, physical computing and real-world experiences.
          </p>
          <a
            href={content("about.studioUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-button cp-button--ink"
          >
            START WITH A WEIRD QUESTION <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <aside className="cp-about-note">
          <p className="cp-about-note-label">ABOUT THE PERSON ENCOURAGING THE BAD BEHAVIOUR</p>
          <h3>HI, I&apos;M BRYAN.</h3>
          <p>I&apos;m a creative technologist making curiosity playable. I build fast, test in public and keep the ideas that still make people reach for them on the tenth try.</p>
          <p className="cp-about-small">CURRENTLY: browser toys → sensors → playful machines → whatever behaves badly next.</p>
          <div className="cp-socials">
            {socials.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon aria-hidden="true" /> {label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
