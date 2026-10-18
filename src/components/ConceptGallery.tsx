const concepts = [
  { file: "01-curious-company", title: "Curious company", alt: "A smiling white character and an orange traffic cone on a paint-splattered stool" },
  { file: "02-small-worlds", title: "Small worlds, big ideas", alt: "A miniature street shop, bicycle and tiny figures arranged around a cardboard box" },
  { file: "03-on-paper", title: "It starts on paper", alt: "A sketchbook exploring a traffic-cone character as a toy, keychain and game character" },
  { file: "04-play-time", title: "Good ideas. Playful detours.", alt: "An imagined Durian Dash KL game on a retro television beside a controller" },
  { file: "05-cabinet-of-curiosities", title: "A cabinet of curiosities", alt: "A clear display case filled with miniature objects, characters and a play-build-experiment note" },
  { file: "06-a-world-underfoot", title: "A world underfoot", alt: "A miniature illuminated shop and trees built into an imagined paint-splattered sneaker" },
];

export default function ConceptGallery() {
  return (
    <section id="concepts" className="studio-concepts" aria-labelledby="concepts-title" aria-describedby="concepts-description">
      <div className="studio-concepts-intro">
        <div>
          <p className="studio-concepts-eyebrow">An open sketchbook / 01—06</p>
          <h2 id="concepts-title">Things That<br />Could Exist</h2>
        </div>
        <p id="concepts-description">Visual experiments, imaginary objects, and ideas from 881230.studio. <strong>Concept illustrations, not completed projects.</strong></p>
      </div>
      <div className="studio-concepts-grid">
        {concepts.map((concept, i) => (
          <figure key={concept.file} className="studio-concept">
            <img src={`/concepts/${concept.file}.jpg`} alt={`Concept illustration: ${concept.alt}`} width={504} height={504} loading="lazy" decoding="async" />
            <figcaption>
              <span className="studio-concept-label">{String(i + 1).padStart(2, "0")} / Concept illustration</span>
              <h3>{concept.title}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
