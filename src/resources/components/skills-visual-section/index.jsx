"use client";

import styles from "./skills-visual-section.module.scss";

/** SVG Icon paths for technologies */
const IconHtml = () => (
  <path
    d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
    transform="translate(10, 10) scale(0.7) translate(-10, -10)"
    fill="url(#paint_html)"
  />
);

const IconCss = () => (
  <path
    d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"
    transform="translate(10, 10) scale(0.7) translate(-10, -10)"
    fill="url(#paint_css)"
  />
);

const IconJs = () => (
  <path
    d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
    transform="translate(10, 10) scale(0.7) translate(-10, -10)"
    fill="url(#paint_js)"
  />
);

const IconReact = () => (
  <path
    d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
    transform="translate(10, 10) scale(0.7) translate(-10, -10)"
    fill="url(#paint_react)"
  />
);

const IconNext = () => (
  <path
    d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"
    transform="translate(10, 10) scale(0.7) translate(-10, -10)"
    fill="url(#paint_next)"
  />
);

const IconNode = () => (
  <path
    d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"
    transform="translate(10, 10) scale(0.7) translate(-10, -10)"
    fill="url(#paint_node)"
  />
);

const IconExpress = () => (
  <path
    d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"
    transform="translate(10, 10) scale(0.7) translate(-10, -10)"
    fill="url(#paint_express)"
  />
);

const IconMongodb = () => (
  <path
    d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"
    transform="translate(10, 10) scale(0.7) translate(-10, -10)"
    fill="url(#paint_mongodb)"
  />
);

/** Helper component to render a skill pill node with logo and technology name */
function SkillPill({ x, y, width, name, IconComponent }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="0"
        y="0"
        width={width}
        height="32"
        rx="16"
        fill="#121212"
        stroke="#c9a84c"
        strokeWidth="1.2"
        strokeOpacity="0.35"
      />
      <g transform="translate(6, 6)">
        <IconComponent />
      </g>
      <text
        x="34"
        y="20"
        fill="#F1F5F9"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
        letterSpacing="0.2px"
      >
        {name}
      </text>
    </g>
  );
}

export default function SkillsVisualSection() {
  return (
    <section id="skills" className={`${styles.root} revealOnScroll`}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.labelPill}>
            <svg
              className={styles.sparkIcon}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0L9.79611 6.20389L16 8L9.79611 9.79611L8 16L6.20389 9.79611L0 8L6.20389 6.20389L8 0Z" />
            </svg>
            <span className={styles.labelText}>Skills &amp; Technologies</span>
          </div>
        </header>

        <div className={styles.illustrationContainer}>
          <svg
            className={styles.illustration}
            viewBox="0 0 1000 740"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connector Lines from top pill badges down to central core */}
            <path d="M155 62 C155 220, 485 320, 488 410" stroke="url(#paint0_linear_16_227)" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M301 62 C301 220, 492 320, 493 410" stroke="url(#paint1_linear_16_227)" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M459 62 C459 220, 498 320, 498 410" stroke="url(#paint2_linear_16_227)" strokeWidth="1.5" strokeOpacity="0.55" />
            <path d="M625 62 C625 220, 503 320, 502 410" stroke="url(#paint3_linear_16_227)" strokeWidth="1.5" strokeOpacity="0.55" />
            <path d="M779 62 C779 220, 508 320, 506 410" stroke="url(#paint4_linear_16_227)" strokeWidth="1.5" strokeOpacity="0.5" />

            {/* Row 2 connector lines */}
            <path d="M279 132 C279 240, 492 330, 493 410" stroke="url(#paint1_linear_16_227)" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M496 132 C496 240, 500 330, 500 410" stroke="url(#paint2_linear_16_227)" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M715 132 C715 240, 506 330, 505 410" stroke="url(#paint3_linear_16_227)" strokeWidth="1.5" strokeOpacity="0.5" />

            {/* Elliptical orbit glow backgrounds */}
            <ellipse cx="500" cy="510" rx="270" ry="155" fill="url(#paint6_radial_16_227)" />
            <circle cx="500" cy="470" r="80" fill="url(#paint7_linear_16_227)" />

            {/* Central Monogram Core */}
            <g filter="url(#filter0_d_16_227)">
              <path fillRule="evenodd" clipRule="evenodd" d="M533.508 444.891C533.508 447.14 531.685 448.963 529.435 448.963H471.436C469.187 448.963 467.364 447.14 467.364 444.891C467.364 442.641 469.187 440.818 471.436 440.818H529.435C531.685 440.818 533.508 442.641 533.508 444.891Z" fill="white" />
              <path fillRule="evenodd" clipRule="evenodd" d="M533.508 516.746C533.508 518.995 531.685 520.818 529.435 520.818H471.436C469.187 520.818 467.364 518.995 467.364 516.746C467.364 514.496 469.187 512.673 471.436 512.673H529.435C531.685 512.673 533.508 514.496 533.508 516.746Z" fill="white" />
              <path d="M504.002 444.891L477.592 479.866L504.002 517.698" stroke="white" strokeWidth="7" />
            </g>

            {/* Concentric 3D Perspective Orbit lines */}
            {/* Outer Orbit (Orbit 1) */}
            <path d="M500 390 C625 390, 735 405, 815 430 C855 442, 887 457, 909 473 C931 489, 943 506, 943 525 C943 543, 931 560, 909 576 C887 592, 855 607, 815 619 C735 643, 625 658, 500 658 C375 658, 265 643, 185 619 C145 607, 113 592, 91 576 C69 560, 57 543, 57 525 C57 506, 69 489, 91 473 C113 457, 145 442, 185 430 C265 405, 375 390, 500 390 Z" stroke="url(#paint8_linear_16_227)" />
            {/* Middle Orbit (Orbit 2) */}
            <path d="M500 390 C605 390, 700 405, 770 430 C805 442, 833 457, 852 473 C871 489, 882 506, 882 525 C882 543, 871 560, 852 576 C833 592, 805 607, 770 619 C700 643, 605 658, 500 658 C395 658, 300 643, 230 619 C195 607, 167 592, 148 576 C129 560, 118 543, 118 525 C118 506, 129 489, 148 473 C167 457, 195 442, 230 430 C300 405, 395 390, 500 390 Z" stroke="url(#paint9_linear_16_227)" />
            {/* Inner Orbit (Orbit 3) */}
            <path d="M500 390 C575 390, 650 405, 710 430 C745 442, 770 457, 788 473 C805 489, 815 506, 815 525 C815 543, 805 560, 788 576 C770 592, 745 607, 710 619 C650 643, 575 658, 500 658 C425 658, 350 643, 290 619 C255 607, 230 592, 212 576 C195 560, 185 543, 185 525 C185 506, 195 489, 212 473 C230 457, 255 442, 290 430 C350 405, 425 390, 500 390 Z" stroke="url(#paint10_linear_16_227)" />

            {/* TOP SKILLS PILL BADGES (Row 1) */}
            <SkillPill x={110} y={30} width={90} name="HTML" IconComponent={IconHtml} />
            <SkillPill x={260} y={30} width={82} name="CSS" IconComponent={IconCss} />
            <SkillPill x={400} y={30} width={118} name="JavaScript" IconComponent={IconJs} />
            <SkillPill x={580} y={30} width={90} name="React" IconComponent={IconReact} />
            <SkillPill x={730} y={30} width={98} name="Next.js" IconComponent={IconNext} />

            {/* TOP SKILLS PILL BADGES (Row 2) */}
            <SkillPill x={230} y={100} width={98} name="Node.js" IconComponent={IconNode} />
            <SkillPill x={440} y={100} width={112} name="Express.js" IconComponent={IconExpress} />
            <SkillPill x={660} y={100} width={110} name="MongoDB" IconComponent={IconMongodb} />

            {/* BOTTOM ORBIT SKILLS PILL BADGES */}
            {/* Outer Orbit items (Orbit 1) */}
            <SkillPill x={65} y={508} width={112} name="Express.js" IconComponent={IconExpress} />
            {/* <SkillPill x={100} y={635} width={90} name="HTML" IconComponent={IconHtml} /> */}
            {/* <SkillPill x={810} y={635} width={82} name="CSS" IconComponent={IconCss} /> */}

            {/* Middle Orbit items (Orbit 2) */}
            <SkillPill x={135} y={445} width={98} name="Node.js" IconComponent={IconNode} />
            <SkillPill x={765} y={445} width={98} name="Next.js" IconComponent={IconNext} />
            <SkillPill x={825} y={540} width={90} name="React" IconComponent={IconReact} />

            {/* Inner Orbit items (Orbit 3) */}
            <SkillPill x={200} y={570} width={110} name="MongoDB" IconComponent={IconMongodb} />
            <SkillPill x={670} y={570} width={118} name="JavaScript" IconComponent={IconJs} />

            {/* Definitions for gradients and drop shadows */}
            <defs>
              <filter id="filter0_d_16_227" x="448.364" y="427.818" width="104.144" height="118" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="7" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_16_227" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_16_227" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_16_227" x1="500" y1="30" x2="500" y2="470" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c9a84c" stopOpacity="0.7" />
                <stop offset="1" stopColor="#c9a84c" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="paint1_linear_16_227" x1="500" y1="30" x2="500" y2="470" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c9a84c" stopOpacity="0.7" />
                <stop offset="1" stopColor="#c9a84c" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="paint2_linear_16_227" x1="500" y1="30" x2="500" y2="470" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c9a84c" stopOpacity="0.7" />
                <stop offset="1" stopColor="#c9a84c" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="paint3_linear_16_227" x1="500" y1="30" x2="500" y2="470" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c9a84c" stopOpacity="0.7" />
                <stop offset="1" stopColor="#c9a84c" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="paint4_linear_16_227" x1="500" y1="30" x2="500" y2="470" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c9a84c" stopOpacity="0.7" />
                <stop offset="1" stopColor="#c9a84c" stopOpacity="0.1" />
              </linearGradient>
              <radialGradient id="paint6_radial_16_227" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(500 510) rotate(90) scale(155 270)">
                <stop stopColor="#c9a84c" stopOpacity="0.3" />
                <stop offset="1" stopColor="#0a0a0a" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="paint7_linear_16_227" x1="500" y1="390" x2="500" y2="550" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c9a84c" stopOpacity="0.35" />
                <stop offset="1" stopColor="#8c7335" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="paint8_linear_16_227" x1="500" y1="350" x2="500" y2="670" gradientUnits="userSpaceOnUse">
                <stop stopOpacity="0" />
                <stop offset="0.48" stopColor="#c9a84c" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="paint9_linear_16_227" x1="500" y1="350" x2="500" y2="670" gradientUnits="userSpaceOnUse">
                <stop stopOpacity="0" />
                <stop offset="0.48" stopColor="#c9a84c" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="paint10_linear_16_227" x1="500" y1="350" x2="500" y2="670" gradientUnits="userSpaceOnUse">
                <stop stopOpacity="0" />
                <stop offset="0.48" stopColor="#c9a84c" stopOpacity="0.4" />
              </linearGradient>

              {/* Color Gradients for Icons */}
              <linearGradient id="paint_html" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#E44D26" />
                <stop offset="1" stopColor="#F16529" />
              </linearGradient>
              <linearGradient id="paint_css" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#264DE4" />
                <stop offset="1" stopColor="#2965F1" />
              </linearGradient>
              <linearGradient id="paint_js" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#F7DF1E" />
                <stop offset="1" stopColor="#F0DB4F" />
              </linearGradient>
              <linearGradient id="paint_react" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#61DAFB" />
                <stop offset="1" stopColor="#00B4D8" />
              </linearGradient>
              <linearGradient id="paint_next" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#A0A0A0" />
              </linearGradient>
              <linearGradient id="paint_node" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#68A063" />
                <stop offset="1" stopColor="#3C873A" />
              </linearGradient>
              <linearGradient id="paint_express" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#E2E8F0" />
                <stop offset="1" stopColor="#94A3B8" />
              </linearGradient>
              <linearGradient id="paint_mongodb" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#47A248" />
                <stop offset="1" stopColor="#3F8A40" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
