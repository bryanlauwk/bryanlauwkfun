import { Asterisk, ArrowUp } from "lucide-react";

export function PlayFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="cp-footer">
      <div className="cp-shell cp-footer-inner">
        <p><Asterisk aria-hidden="true" /> bryanlauwk.fun / {year}</p>
        <p>MAKING CURIOSITY PLAYABLE. SOMETIMES MAKING A MESS.</p>
        <a href="#top">BACK TO THE BAD IDEAS <ArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
