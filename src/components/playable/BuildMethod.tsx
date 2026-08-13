import { ArrowDownRight, Box, DoorOpen, MonitorPlay } from "lucide-react";

const STAGES = [
  {
    number: "01",
    title: "SCREEN",
    label: "PROVE THE JOKE",
    body: "Start cheap and fast in the browser. Find the rule, the reaction and the moment somebody wants to try it again.",
    Icon: MonitorPlay,
    color: "red",
  },
  {
    number: "02",
    title: "SPACE",
    label: "MAKE IT SOCIAL",
    body: "Let bodies, distance and other people become inputs. The room should change because somebody was brave enough to move.",
    Icon: DoorOpen,
    color: "blue",
  },
  {
    number: "03",
    title: "STUFF",
    label: "LET PHYSICS ANSWER BACK",
    body: "Give the idea weight, friction, noise and bad manners. Sensors notice. Mechanisms react. The ordinary object gets a motive.",
    Icon: Box,
    color: "yellow",
  },
];

export function BuildMethod() {
  return (
    <section id="method" className="cp-section cp-method" aria-labelledby="method-heading">
      <div className="cp-shell">
        <div className="cp-method-heading">
          <p className="cp-kicker">HOW AN IDEA ESCAPES THE TAB</p>
          <h2 id="method-heading" className="cp-section-title">SCREEN → SPACE → STUFF</h2>
          <p>Not every experiment needs to make the whole trip. But every medium should make the behaviour more legible, more social or more surprising.</p>
        </div>

        <ol className="cp-method-grid">
          {STAGES.map(({ number, title, label, body, Icon, color }, index) => (
            <li key={title} className={`cp-method-card cp-color-${color}`}>
              <div className="cp-method-card-top">
                <span>{number}</span>
                <Icon aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p className="cp-method-label">{label}</p>
              <p className="cp-method-body">{body}</p>
              {index < STAGES.length - 1 && <ArrowDownRight className="cp-method-arrow" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <div className="cp-rule-card">
          <p>THE RULE</p>
          <strong>IF THE TECHNOLOGY IS THE MOST INTERESTING PART, THE IDEA ISN&apos;T MISBEHAVING ENOUGH YET.</strong>
        </div>
      </div>
    </section>
  );
}
