import { cn } from "@/lib/utils";

interface HeroDoodleProps {
  className?: string;
}

export const HeroDoodle = ({ className }: HeroDoodleProps) => {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 400 380"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === ISOMETRIC PENROSE STAIRCASE === */}
        
        {/* Bottom-left section going right */}
        <g stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinejoin="round">
          {/* Step 1 - Bottom left */}
          <path d="M80 280 L80 260 L120 240 L120 260 Z" fill="hsl(var(--background))" />
          <path d="M120 240 L120 260 L160 280 L160 260 Z" fill="hsl(var(--background))" />
          {/* Hatching */}
          <line x1="82" y1="275" x2="82" y2="262" strokeWidth="1" opacity="0.4" />
          <line x1="88" y1="272" x2="88" y2="258" strokeWidth="1" opacity="0.4" />
          <line x1="94" y1="268" x2="94" y2="254" strokeWidth="1" opacity="0.4" />
          <line x1="100" y1="264" x2="100" y2="250" strokeWidth="1" opacity="0.4" />
          <line x1="106" y1="260" x2="106" y2="246" strokeWidth="1" opacity="0.4" />
          <line x1="112" y1="256" x2="112" y2="242" strokeWidth="1" opacity="0.4" />
          
          {/* Step 2 */}
          <path d="M120 260 L120 240 L160 220 L160 240 Z" fill="hsl(var(--background))" />
          <path d="M160 220 L160 240 L200 260 L200 240 Z" fill="hsl(var(--background))" />
          <line x1="122" y1="255" x2="122" y2="242" strokeWidth="1" opacity="0.4" />
          <line x1="128" y1="251" x2="128" y2="238" strokeWidth="1" opacity="0.4" />
          <line x1="134" y1="247" x2="134" y2="234" strokeWidth="1" opacity="0.4" />
          <line x1="140" y1="243" x2="140" y2="230" strokeWidth="1" opacity="0.4" />
          <line x1="146" y1="239" x2="146" y2="226" strokeWidth="1" opacity="0.4" />
          <line x1="152" y1="235" x2="152" y2="222" strokeWidth="1" opacity="0.4" />
          
          {/* Step 3 */}
          <path d="M160 240 L160 220 L200 200 L200 220 Z" fill="hsl(var(--background))" />
          <path d="M200 200 L200 220 L240 240 L240 220 Z" fill="hsl(var(--background))" />
          <line x1="162" y1="235" x2="162" y2="222" strokeWidth="1" opacity="0.4" />
          <line x1="168" y1="231" x2="168" y2="218" strokeWidth="1" opacity="0.4" />
          <line x1="174" y1="227" x2="174" y2="214" strokeWidth="1" opacity="0.4" />
          <line x1="180" y1="223" x2="180" y2="210" strokeWidth="1" opacity="0.4" />
          <line x1="186" y1="219" x2="186" y2="206" strokeWidth="1" opacity="0.4" />
          <line x1="192" y1="215" x2="192" y2="202" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Right side going up */}
        <g stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinejoin="round">
          {/* Step 4 */}
          <path d="M240 220 L240 200 L280 180 L280 200 Z" fill="hsl(var(--background))" />
          <path d="M280 180 L280 200 L320 220 L320 200 Z" fill="hsl(var(--background))" />
          <line x1="242" y1="215" x2="242" y2="202" strokeWidth="1" opacity="0.4" />
          <line x1="248" y1="211" x2="248" y2="198" strokeWidth="1" opacity="0.4" />
          <line x1="254" y1="207" x2="254" y2="194" strokeWidth="1" opacity="0.4" />
          <line x1="260" y1="203" x2="260" y2="190" strokeWidth="1" opacity="0.4" />
          <line x1="266" y1="199" x2="266" y2="186" strokeWidth="1" opacity="0.4" />
          <line x1="272" y1="195" x2="272" y2="182" strokeWidth="1" opacity="0.4" />
          
          {/* Step 5 */}
          <path d="M280 200 L280 180 L320 160 L320 180 Z" fill="hsl(var(--background))" />
          <path d="M320 160 L320 180 L340 190 L340 170 Z" fill="hsl(var(--background))" />
          <line x1="282" y1="195" x2="282" y2="182" strokeWidth="1" opacity="0.4" />
          <line x1="288" y1="191" x2="288" y2="178" strokeWidth="1" opacity="0.4" />
          <line x1="294" y1="187" x2="294" y2="174" strokeWidth="1" opacity="0.4" />
          <line x1="300" y1="183" x2="300" y2="170" strokeWidth="1" opacity="0.4" />
          <line x1="306" y1="179" x2="306" y2="166" strokeWidth="1" opacity="0.4" />
          <line x1="312" y1="175" x2="312" y2="162" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Top section going left */}
        <g stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinejoin="round">
          {/* Step 6 */}
          <path d="M320 160 L320 140 L280 120 L280 140 Z" fill="hsl(var(--background))" />
          <path d="M280 120 L280 140 L240 160 L240 140 Z" fill="hsl(var(--background))" />
          <line x1="318" y1="155" x2="318" y2="142" strokeWidth="1" opacity="0.4" />
          <line x1="312" y1="151" x2="312" y2="138" strokeWidth="1" opacity="0.4" />
          <line x1="306" y1="147" x2="306" y2="134" strokeWidth="1" opacity="0.4" />
          <line x1="300" y1="143" x2="300" y2="130" strokeWidth="1" opacity="0.4" />
          <line x1="294" y1="139" x2="294" y2="126" strokeWidth="1" opacity="0.4" />
          <line x1="288" y1="135" x2="288" y2="122" strokeWidth="1" opacity="0.4" />
          
          {/* Step 7 */}
          <path d="M280 140 L280 120 L240 100 L240 120 Z" fill="hsl(var(--background))" />
          <path d="M240 100 L240 120 L200 140 L200 120 Z" fill="hsl(var(--background))" />
          <line x1="278" y1="135" x2="278" y2="122" strokeWidth="1" opacity="0.4" />
          <line x1="272" y1="131" x2="272" y2="118" strokeWidth="1" opacity="0.4" />
          <line x1="266" y1="127" x2="266" y2="114" strokeWidth="1" opacity="0.4" />
          <line x1="260" y1="123" x2="260" y2="110" strokeWidth="1" opacity="0.4" />
          <line x1="254" y1="119" x2="254" y2="106" strokeWidth="1" opacity="0.4" />
          <line x1="248" y1="115" x2="248" y2="102" strokeWidth="1" opacity="0.4" />
          
          {/* Step 8 */}
          <path d="M240 120 L240 100 L200 80 L200 100 Z" fill="hsl(var(--background))" />
          <path d="M200 80 L200 100 L160 120 L160 100 Z" fill="hsl(var(--background))" />
          <line x1="238" y1="115" x2="238" y2="102" strokeWidth="1" opacity="0.4" />
          <line x1="232" y1="111" x2="232" y2="98" strokeWidth="1" opacity="0.4" />
          <line x1="226" y1="107" x2="226" y2="94" strokeWidth="1" opacity="0.4" />
          <line x1="220" y1="103" x2="220" y2="90" strokeWidth="1" opacity="0.4" />
          <line x1="214" y1="99" x2="214" y2="86" strokeWidth="1" opacity="0.4" />
          <line x1="208" y1="95" x2="208" y2="82" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Left side going down (connects back - impossible!) */}
        <g stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinejoin="round">
          {/* Step 9 */}
          <path d="M160 100 L160 120 L120 140 L120 120 Z" fill="hsl(var(--background))" />
          <path d="M120 120 L120 140 L80 120 L80 100 Z" fill="hsl(var(--background))" />
          <line x1="158" y1="105" x2="158" y2="118" strokeWidth="1" opacity="0.4" />
          <line x1="152" y1="109" x2="152" y2="122" strokeWidth="1" opacity="0.4" />
          <line x1="146" y1="113" x2="146" y2="126" strokeWidth="1" opacity="0.4" />
          <line x1="140" y1="117" x2="140" y2="130" strokeWidth="1" opacity="0.4" />
          <line x1="134" y1="121" x2="134" y2="134" strokeWidth="1" opacity="0.4" />
          <line x1="128" y1="125" x2="128" y2="138" strokeWidth="1" opacity="0.4" />
          
          {/* Step 10 */}
          <path d="M120 140 L120 160 L80 180 L80 160 Z" fill="hsl(var(--background))" />
          <path d="M80 160 L80 180 L60 170 L60 150 Z" fill="hsl(var(--background))" />
          <line x1="118" y1="145" x2="118" y2="158" strokeWidth="1" opacity="0.4" />
          <line x1="112" y1="149" x2="112" y2="162" strokeWidth="1" opacity="0.4" />
          <line x1="106" y1="153" x2="106" y2="166" strokeWidth="1" opacity="0.4" />
          <line x1="100" y1="157" x2="100" y2="170" strokeWidth="1" opacity="0.4" />
          <line x1="94" y1="161" x2="94" y2="174" strokeWidth="1" opacity="0.4" />
          <line x1="88" y1="165" x2="88" y2="178" strokeWidth="1" opacity="0.4" />
          
          {/* Connecting back to start */}
          <path d="M80 180 L80 200 L60 210 L60 190 Z" fill="hsl(var(--background))" />
          <path d="M60 190 L60 210 L80 220 L80 200 Z" fill="hsl(var(--background))" />
          <line x1="78" y1="185" x2="78" y2="198" strokeWidth="1" opacity="0.4" />
          <line x1="72" y1="189" x2="72" y2="202" strokeWidth="1" opacity="0.4" />
          <line x1="66" y1="193" x2="66" y2="206" strokeWidth="1" opacity="0.4" />
        </g>

        {/* === CHARACTER WITH BACKPACK === */}
        <g transform="translate(95, 225)">
          {/* Body with walking animation */}
          <g className="animate-bob-body" style={{ transformOrigin: '15px 20px' }}>
            {/* Head */}
            <circle cx="15" cy="-5" r="10" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
            {/* Curly hair */}
            <path d="M8 -12 Q5 -18, 10 -16 Q8 -20, 14 -17 Q12 -22, 18 -17 Q17 -20, 22 -14" 
                  stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Face - surprised expression */}
            <circle cx="11" cy="-6" r="2" fill="hsl(var(--foreground))" />
            <circle cx="19" cy="-6" r="2" fill="hsl(var(--foreground))" />
            <ellipse cx="15" cy="0" rx="3" ry="2" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            
            {/* Body */}
            <line x1="15" y1="5" x2="15" y2="28" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Backpack */}
            <rect x="18" y="8" width="12" height="16" rx="2" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="20" y1="12" x2="28" y2="12" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <line x1="20" y1="16" x2="28" y2="16" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            {/* Backpack strap */}
            <path d="M18 10 Q15 8, 15 12" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" />
          </g>
          
          {/* Left arm */}
          <g className="animate-walk-left-arm" style={{ transformOrigin: '15px 10px' }}>
            <line x1="15" y1="10" x2="5" y2="5" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          
          {/* Right arm */}
          <g className="animate-walk-right-arm" style={{ transformOrigin: '15px 10px' }}>
            <line x1="15" y1="10" x2="18" y2="18" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          
          {/* Left leg */}
          <g className="animate-walk-left-leg" style={{ transformOrigin: '15px 28px' }}>
            <line x1="15" y1="28" x2="8" y2="42" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          
          {/* Right leg */}
          <g className="animate-walk-right-leg" style={{ transformOrigin: '15px 28px' }}>
            <line x1="15" y1="28" x2="22" y2="38" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        {/* === DECORATIVE DOODLES === */}
        
        {/* Music notes */}
        <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
          <path d="M45 120 L45 105 Q50 100, 55 105" />
          <ellipse cx="45" cy="122" rx="4" ry="3" fill="hsl(var(--foreground))" />
          
          <path d="M70 90 L70 75" />
          <ellipse cx="70" cy="92" rx="4" ry="3" fill="hsl(var(--foreground))" />
          <path d="M70 75 Q75 72, 80 78 L80 92" />
          <ellipse cx="80" cy="94" rx="4" ry="3" fill="hsl(var(--foreground))" />
        </g>
        
        {/* Math symbols */}
        <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
          {/* Integral */}
          <path d="M55 145 Q50 150, 52 160 L52 175 Q54 185, 48 190" strokeWidth="2" />
          
          {/* X variable */}
          <text x="68" y="155" fill="hsl(var(--foreground))" fontSize="14" fontFamily="serif" fontStyle="italic">x</text>
          
          {/* Equals */}
          <line x1="80" y1="148" x2="92" y2="148" strokeWidth="2" />
          <line x1="80" y1="154" x2="92" y2="154" strokeWidth="2" />
          
          {/* Pi symbol */}
          <text x="340" y="100" fill="hsl(var(--foreground))" fontSize="16" fontFamily="serif">π</text>
          
          {/* Not equal */}
          <line x1="350" y1="140" x2="362" y2="140" strokeWidth="2" />
          <line x1="350" y1="146" x2="362" y2="146" strokeWidth="2" />
          <line x1="352" y1="135" x2="360" y2="151" strokeWidth="2" />
        </g>
        
        {/* Question mark and bubbles */}
        <g>
          <text x="55" y="215" fill="hsl(var(--foreground))" fontSize="16" fontFamily="serif">?</text>
          <circle cx="45" cy="200" r="3" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <circle cx="38" cy="190" r="2" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <circle cx="50" cy="185" r="4" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <circle cx="65" cy="175" r="2.5" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        </g>
        
        {/* Clouds */}
        <g fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5">
          <path d="M340 200 Q335 195, 340 190 Q345 185, 352 190 Q360 185, 365 192 Q372 190, 370 198 Q375 205, 365 205 L345 205 Q335 208, 340 200" />
          <path d="M30 290 Q25 285, 30 280 Q35 275, 42 280 Q50 275, 55 282 Q45 288, 30 290" />
        </g>
        
        {/* Small decorative marks */}
        <g stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.6">
          {/* Dots */}
          <circle cx="355" cy="165" r="2" fill="hsl(var(--foreground))" />
          <circle cx="365" cy="175" r="1.5" fill="hsl(var(--foreground))" />
          <circle cx="35" cy="255" r="2" fill="hsl(var(--foreground))" />
          <circle cx="375" cy="250" r="2" fill="hsl(var(--foreground))" />
          
          {/* Small lines/marks */}
          <line x1="350" y1="120" x2="355" y2="115" />
          <line x1="358" y1="122" x2="363" y2="117" />
          <line x1="320" y1="80" x2="328" y2="75" />
          <line x1="325" y1="70" x2="330" y2="65" />
        </g>
        
        {/* Arrows scattered around */}
        <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none">
          {/* Small arrows */}
          <path d="M355 220 L365 215 L360 225 Z" />
          <path d="M360 235 L370 230 L365 240 Z" />
          <path d="M348 245 L358 240 L353 250 Z" />
        </g>
        
        {/* Squiggly lines */}
        <g stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" opacity="0.5">
          <path d="M330 55 Q335 50, 340 55 Q345 60, 350 55" />
          <path d="M45 165 Q50 160, 55 165 Q60 170, 65 165" />
        </g>

        {/* === LARGE 3D ARROW === */}
        <g transform="translate(50, 300)">
          <path d="M0 20 L60 20 L60 0 L100 30 L60 60 L60 40 L0 40 Z" 
                fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
          {/* 3D depth */}
          <path d="M0 40 L0 50 L60 50 L60 70 L70 65 L70 45 L60 40" 
                fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <path d="M60 60 L60 70 L70 65 L100 35 L100 30 L60 60" 
                fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
          {/* Hatching on sides */}
          <line x1="5" y1="42" x2="5" y2="48" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <line x1="15" y1="42" x2="15" y2="48" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <line x1="25" y1="42" x2="25" y2="48" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <line x1="35" y1="42" x2="35" y2="48" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <line x1="45" y1="42" x2="45" y2="48" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <line x1="55" y1="42" x2="55" y2="48" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
        </g>

        {/* === "YOU ARE HERE" TEXT === */}
        <g transform="translate(250, 320)">
          {/* Curved arrow pointing to stairs */}
          <path d="M-10 10 Q-30 -20, -60 -30" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <path d="M-55 -35 L-60 -30 L-55 -25" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Text */}
          <text x="0" y="0" fill="hsl(var(--foreground))" fontSize="16" fontFamily="Comic Sans MS, cursive" fontWeight="bold">
            YOU ARE
          </text>
          <text x="0" y="20" fill="hsl(var(--foreground))" fontSize="16" fontFamily="Comic Sans MS, cursive" fontWeight="bold">
            HERE.
          </text>
        </g>

        {/* Color accent dots */}
        <g className="animate-pulse">
          <circle cx="340" cy="85" r="3" fill="hsl(var(--primary))" />
          <circle cx="60" cy="135" r="2.5" fill="hsl(var(--primary))" opacity="0.7" />
          <circle cx="375" cy="190" r="2" fill="hsl(var(--primary))" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};
