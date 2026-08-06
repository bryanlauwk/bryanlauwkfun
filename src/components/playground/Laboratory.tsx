const NOTES = [
  {
    title: "Things that only exist at 2am",
    body: "A list of ideas that seemed brilliant in the dark and merely interesting by breakfast. Some of them survive to become drops.",
  },
  {
    title: "Failure log",
    body: "The physics sim that ate a weekend. The shader that melted a laptop. Kept because the wreckage is more honest than the highlight reel.",
  },
  {
    title: "Borrowed instincts",
    body: "Notes on games, films and strangers on the internet who taught me that friction, mystery and a bit of danger beat convenience.",
  },
];

export function Laboratory() {
  return (
    <section
      id="lab"
      className="relative px-5 py-20 md:px-10 md:py-28"
      aria-labelledby="lab-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="lp-label">The laboratory</p>
        <h2 id="lab-heading" className="mt-4 font-tide text-4xl italic text-foreground md:text-5xl">
          Where things are still wrong
        </h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Process, mess and thinking out loud. No conclusions offered.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {NOTES.map((note, i) => (
            <article key={note.title} className="lp-shard lp-shard--tall">
              <span className="lp-label">Note {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-tide text-2xl italic leading-tight text-foreground">
                {note.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note.body}</p>
            </article>
          ))}
        </div>

        <a
          href="https://ideas.bryanlauwk.fun"
          target="_blank"
          rel="noopener noreferrer"
          className="lp-button lp-button--ghost mt-10"
        >
          The Studio · my idea engine
        </a>
      </div>
    </section>
  );
}
