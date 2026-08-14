import { useState } from "react";
import { ChevronDown } from "lucide-react";
import needyPlant from "@/assets/curiosity/needy-plant.webp";
import judgementalBin from "@/assets/curiosity/judgemental-bin.webp";
import overreactingBell from "@/assets/curiosity/overreacting-bell.webp";
import shyCup from "@/assets/curiosity/shy-cup.webp";
import sleepMonster from "@/assets/curiosity/sleep-monster.webp";
import snackSniper from "@/assets/curiosity/snack-sniper.webp";
import procrastinationPrinter from "@/assets/curiosity/procrastination-printer.webp";
import applauseMicrowave from "@/assets/curiosity/applause-microwave.webp";
import pettyCoatHook from "@/assets/curiosity/petty-coat-hook.webp";
import alibiLamp from "@/assets/curiosity/alibi-lamp.webp";

type Concept = {
  id: string;
  index: string;
  name: string;
  hook: string;
  object: string;
  personality: string;
  behaviour: string;
  surprise: string;
  image?: string;
  imageAlt?: string;
  color: "red" | "yellow" | "blue" | "green";
  featured?: boolean;
};

const CONCEPTS: Concept[] = [
  {
    id: "needy-plant",
    index: "01",
    name: "THE NEEDY PLANT",
    hook: "It does not need water. It needs validation.",
    object: "A pothos on a servo-driven tilting base.",
    personality: "Clingy, competitive and emotionally over-watered.",
    behaviour: "Leans into anyone nearby. Flashes when you leave. Keeps score of your attention.",
    surprise: "Ignore it long enough and it dramatically waters the plant next door instead.",
    image: needyPlant,
    imageAlt: "A Malaysian Chinese woman recoiling as a giant red servo-mounted planter leans at her and waters the plant beside it.",
    color: "green",
    featured: true,
  },
  {
    id: "judgemental-bin",
    index: "02",
    name: "THE JUDGEMENTAL BIN",
    hook: "Technically, it accepts rubbish. Emotionally, it has standards.",
    object: "A recycling bin with a scanner, servo lid and receipt printer.",
    personality: "Smug. Petty. Deeply invested in your sorting habits.",
    behaviour: "Inspects each item, hesitates theatrically, then rates the decision on an analog meter.",
    surprise: "Bad recycling gets rejected with a tiny passive-aggressive receipt.",
    image: judgementalBin,
    imageAlt: "A Malaysian Chinese man holding a takeaway cup while a huge green motorised bin swings its judgement meter and prints a receipt.",
    color: "yellow",
    featured: true,
  },
  {
    id: "overreacting-bell",
    index: "03",
    name: "THE OVERREACTING BELL",
    hook: "A very small input with absolutely no sense of proportion.",
    object: "One desk bell wired to horns, flags, fans and far too many lights.",
    personality: "Attention-starved theatre kid.",
    behaviour: "Looks harmless when pressed. Waits one suspicious beat.",
    surprise: "Then the whole bench performs a twelve-second victory parade for you.",
    image: overreactingBell,
    imageAlt: "A Malaysian Chinese teenager pressing a tiny red desk bell as a huge horn-and-confetti rig erupts behind it.",
    color: "red",
  },
  {
    id: "shy-cup",
    index: "04",
    name: "THE SHY CUP",
    hook: "Hydration, but make it socially avoidant.",
    object: "A chipped cup on a motorized coaster with a distance sensor.",
    personality: "Painfully shy, selectively cooperative.",
    behaviour: "Turns its handle away whenever a confident hand reaches for it.",
    surprise: "Whisper ‘please’ and it slowly offers the handle to the quietest person in the room.",
    image: shyCup,
    imageAlt: "A Malaysian Chinese woman reaching for a blue cup that has spun its handle away on a motorised coaster.",
    color: "blue",
  },
  {
    id: "sleep-monster",
    index: "05",
    name: "THE SLEEP MONSTER",
    hook: "It lives under the bed and is weirdly serious about bedtime.",
    object: "A soft kinetic creature linked to your charging cable and screen-time timer.",
    personality: "Sleepy, protective, increasingly unimpressed.",
    behaviour: "Stirs when late-night scrolling crosses the limit, then gently tugs the cable away.",
    surprise: "Put the phone face-down and it purrs, returns the cable and tucks itself back in.",
    image: sleepMonster,
    imageAlt: "A soft robotic creature under the bed tugging the charging cable from a Malaysian Chinese man scrolling at night.",
    color: "blue",
  },
  {
    id: "snack-sniper",
    index: "06",
    name: "THE SNACK SNIPER",
    hook: "Your second handful has been detected.",
    object: "A low-power swivelling snack chute with a reach sensor.",
    personality: "Fair, vigilant and delighted to embarrass the greedy.",
    behaviour: "Serves one snack politely. Dodges the same hand when it comes back too soon.",
    surprise: "The stolen second snack gets launched safely into somebody else’s bowl.",
    image: snackSniper,
    imageAlt: "A Malaysian Chinese woman reaching for a second snack as a red swivelling chute flicks it into a friend's bowl.",
    color: "yellow",
  },
  {
    id: "procrastination-printer",
    index: "07",
    name: "THE PROCRASTINATION PRINTER",
    hook: "A paper trail for everything you did instead of the thing.",
    object: "A thermal printer paired with a local tab-switch counter.",
    personality: "Bureaucratic, nosy and thrilled by evidence.",
    behaviour: "Prints a tiny excuse every time you flee the task tab.",
    surprise: "At ten minutes it presents an itemised invoice for the time you owe yourself.",
    image: procrastinationPrinter,
    imageAlt: "A Malaysian Chinese man at a laptop as an oversized red printer unspools a huge trail of tiny receipts.",
    color: "red",
  },
  {
    id: "applause-microwave",
    index: "08",
    name: "THE APPLAUSE MICROWAVE",
    hook: "Dinner is ready when dinner feels appreciated.",
    object: "A microwave-safe sound sensor and theatrical turntable controller.",
    personality: "Insecure show-off. Huge finale energy.",
    behaviour: "Pauses at 00:01 and refuses to unlock until the room claps.",
    surprise: "A good ovation earns one completely unnecessary victory lap.",
    image: applauseMicrowave,
    imageAlt: "Three Malaysian Chinese friends applauding a blue microwave rigged with microphones that refuses to finish.",
    color: "blue",
  },
  {
    id: "petty-coat-hook",
    index: "09",
    name: "THE PETTY COAT HOOK",
    hook: "It can hold your coat. It chooses not to.",
    object: "A wall hook with a load sensor and slow rotating joint.",
    personality: "Neat freak with union rules.",
    behaviour: "Accepts carefully hung coats and slowly dumps lazy ones back on the floor.",
    surprise: "Say ‘please’ and it rotates the sleeve toward you like a tiny valet.",
    image: pettyCoatHook,
    imageAlt: "A Malaysian Chinese woman watching a yellow motorised wall hook slowly drop her red coat.",
    color: "green",
  },
  {
    id: "alibi-lamp",
    index: "10",
    name: "THE ALIBI LAMP",
    hook: "Go on. Tell the desk why you need five more minutes.",
    object: "A task lamp with a motorized neck, button and focus timer.",
    personality: "Suspicious interrogator with a surprisingly soft side.",
    behaviour: "Tracks you with a hard spotlight whenever you press ‘snooze’ on the task.",
    surprise: "The moment you begin, it warms, lowers the beam and becomes your biggest fan.",
    image: alibiLamp,
    imageAlt: "A Malaysian Chinese man caught with his phone under the hard spotlight of a giant red motorised task lamp.",
    color: "yellow",
  },
];

export function ConceptGallery() {
  const [openId, setOpenId] = useState<string | null>("needy-plant");

  return (
    <section id="experiments" className="cp-section cp-concepts" aria-labelledby="concepts-heading">
      <div className="cp-shell">
        <div className="cp-section-intro">
          <div>
            <p className="cp-kicker">THE 2.0 MISBEHAVIOUR INDEX</p>
            <h2 id="concepts-heading" className="cp-section-title">
              MEET THE BADLY<br />BEHAVED OBJECTS.
            </h2>
          </div>
          <div className="cp-intro-note">
            <p>Take something ordinary, give it a point of view, then build that point of view as real hardware people can walk up to. Made for live rooms, launches and brand activations — one rude little twist each.</p>
            <p className="cp-concept-disclaimer">CONCEPT STUDIES / VISUALISED, NOT YET BUILT</p>
          </div>
        </div>

        <div className="cp-concept-grid">
          {CONCEPTS.map((concept) => {
            const isOpen = openId === concept.id;
            return (
              <article
                key={concept.id}
                className={`cp-concept-card cp-color-${concept.color} ${concept.featured ? "is-featured" : ""} ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="cp-concept-toggle"
                  onClick={() => setOpenId(isOpen ? null : concept.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${concept.id}-formula`}
                >
                  <div className={`cp-concept-media ${concept.image ? "has-photo" : "is-placeholder"}`}>
                    <img src={concept.image} alt={concept.imageAlt} loading="lazy" decoding="async" />
                    <span className="cp-concept-index">{concept.index}</span>
                    <span className="cp-concept-status">CONCEPT / 2.0</span>
                  </div>

                  <div className="cp-concept-summary">
                    <div>
                      <h3>{concept.name}</h3>
                      <p>{concept.hook}</p>
                    </div>
                    <span className="cp-unfold">
                      {isOpen ? "FOLD THE BAD IDEA" : "UNFOLD THE BAD IDEA"}
                      <ChevronDown aria-hidden="true" />
                    </span>
                  </div>
                </button>

                <div id={`${concept.id}-formula`} className="cp-formula" hidden={!isOpen}>
                  <dl>
                    <div><dt>OBJECT</dt><dd>{concept.object}</dd></div>
                    <div><dt>PERSONALITY</dt><dd>{concept.personality}</dd></div>
                    <div><dt>BEHAVIOUR</dt><dd>{concept.behaviour}</dd></div>
                    <div className="cp-surprise"><dt>SURPRISE</dt><dd>{concept.surprise}</dd></div>
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
