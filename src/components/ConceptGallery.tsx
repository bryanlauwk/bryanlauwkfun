const concepts = [
  { file: "01-curious-company", title: "Odd company", alt: "A smiling white character and an orange traffic cone on a paint-splattered stool" },
  { file: "02-small-worlds", title: "Small worlds, big ideas", alt: "A miniature street shop, bicycle and tiny figures arranged around a cardboard box" },
  { file: "03-on-paper", title: "It starts on paper", alt: "A sketchbook exploring a traffic-cone character as a toy, keychain and game character" },
  { file: "04-play-time", title: "Detours worth taking", alt: "An imagined Durian Dash KL game on a retro television beside a controller" },
  { file: "05-cabinet-of-curiosities", title: "A cabinet of curiosities", alt: "A clear display case filled with miniature objects, characters and a play-build-experiment note" },
  { file: "06-a-world-underfoot", title: "A world underfoot", alt: "A miniature illuminated shop and trees built into an imagined paint-splattered sneaker" },
];

export default function ConceptGallery() {
  return (
    <section id="concepts" className="studio-concepts" aria-labelledby="concepts-title" aria-describedby="concepts-description">
      <div className="studio-concepts-intro">
        <div>
          <p className="studio-concepts-eyebrow">An open sketchbook</p>
          <h2 id="concepts-title">Not Yet<br />Real</h2>
        </div>
        <p id="concepts-description">Sketches and objects that don’t exist. Yet.</p>
      </div>
      <div className="studio-concepts-grid">
        {concepts.map((concept) => (
          <figure key={concept.file} className="studio-concept">
            <img src={`/concepts/${concept.file}.jpg`} alt={concept.alt} width={504} height={504} loading="lazy" decoding="async" />
            <figcaption>
              <h3>{concept.title}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
