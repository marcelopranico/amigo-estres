import React, { useState, useEffect, useRef } from "react";

/* ============================ DATOS ============================ */
const PILLARS = {
  mental: {
    name: "Mente",
    tag: "Aquietar los pensamientos",
    grad: ["#6FA88A", "#3E7A5E"],
    soft: "rgba(62,122,94,0.12)",
    ink: "#2C5A45",
    icon: "M12 2a7 7 0 0 0-4 12.7V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.3A7 7 0 0 0 12 2Z",
  },
  emocional: {
    name: "Emoción",
    tag: "Sentir sin pelear",
    grad: ["#E0926A", "#C2603C"],
    soft: "rgba(194,96,60,0.12)",
    ink: "#B0552F",
    icon: "M12 21s-7-4.6-9.3-9C1 8.7 2.6 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.4 0 5 3.7 3.3 7C19 16.4 12 21 12 21Z",
  },
  fisico: {
    name: "Cuerpo",
    tag: "Soltar la tensión",
    grad: ["#8DB46A", "#3E6B3A"],
    soft: "rgba(62,107,58,0.12)",
    ink: "#3E6B3A",
    icon: "M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-7 9h14M9 11l-1 11m8-11 1 11M9 11l3 4 3-4",
  },
  energetico: {
    name: "Energía",
    tag: "Recuperar el impulso",
    grad: ["#F0C14B", "#E0883B"],
    soft: "rgba(224,136,59,0.13)",
    ink: "#C9781F",
    icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  },
};

const FMT = { audio: "Audio", video: "Video", texto: "Lectura" };

const SESSIONS = [
  { id: 1, t: "Recibe el día despierto", p: "mental", m: "mañana", f: "audio", d: 5, premium: false,url: "/audios/dormirsergio.mp3" desc: "Aclara la mente antes de que el día te llene la cabeza." },
  { id: 2, t: "Deja pasar los pensamientos", p: "mental", m: "pausa", f: "audio", d: 7, premium: true,url: "/audios/dormirsergio.mp3" desc: "Como hojas en un río: míralos pasar sin sujetarlos." },
  { id: 3, t: "Raíces para concentrarte", p: "mental", m: "tarde", f: "audio", d: 10, premium: true,url: "/audios/dormirsergio.mp3" desc: "Vuelve al foco cuando la tarde te dispersa." },
  { id: 4, t: "Silencio antes de dormir", p: "mental", m: "noche", f: "texto", d: 4, premium: false,url: "/audios/dormirsergio.mp3" desc: "Una lectura breve para bajar el ruido mental." }, 
  { id: 5, t: "Saluda lo que sientes", p: "emocional", m: "mañana", f: "audio", d: 6, premium: true,url: "/audios/dormirsergio.mp3" desc: "Tu estrés trae un mensaje. Escúchalo sin miedo." },
  { id: 6, t: "Respira la inquietud", p: "emocional", m: "pausa", f: "audio", d: 5, premium: false,url: "/audios/dormirsergio.mp3" desc: "Calma el cuerpo cuando la ansiedad aprieta." },
  { id: 7, t: "Carta a tu yo cansado", p: "emocional", m: "tarde", f: "texto", d: 8, premium: true,url: "/audios/dormirsergio.mp3" desc: "Un ejercicio de escritura amable contigo mismo." },
  { id: 8, t: "Tres gracias", p: "emocional", m: "noche", f: "texto", d: 3, premium: falseurl: "/audios/dormirsergio.mp3" desc: "Tres respiraciones, tres motivos, y a descansar." },

  { id: 9, t: "Despierta el cuerpo", p: "fisico", m: "mañana", f: "video", d: 8, premium: true,url: "/audios/6segmarcelo.mp3" desc: "Movimientos suaves para activarte como una planta al sol." },
  { id: 10, t: "Respiración 4·7·8", p: "fisico", m: "pausa", f: "audio", d: 4, premium: false,url: "/audios/6segmarcelo.mp3" desc: "La técnica que serena el sistema nervioso en minutos." },url: "/audios/6segmarcelo.mp3"
  { id: 11, t: "Suelta de la cabeza a los pies", p: "fisico", m: "tarde", f: "video", d: 12,url: "/audios/6segmarcelo.mp3" premium: true, desc: "Relajación muscular progresiva, capa por capa." url: "/audios/6segmarcelo.mp3"
  { id: 12, t: "Bosque para dormir", p: "fisico", m: "noche", f: "audio", d: 15, premium: true,url: "/audios/6segmarcelo.mp3" desc: "Sonidos del bosque que te llevan al sueño profundo." },url: "/audios/6segmarcelo.mp3"

  { id: 13, t: "Savia de la mañana", p: "energetico", m: "mañana", f: "audio", d: 6, premium: false,url: "/audios/6segmarcelo.mp3" desc: "Despierta tu energía vital para el día que empieza." },url: "/audios/6segmarcelo.mp3"
  { id: 14, t: "Vuelve a tu centro", p: "energetico", m: "pausa", f: "audio", d: 10, premium: true,url: "/audios/6segmarcelo.mp3" desc: "Una pausa para reequilibrar tu energía y centrarte." }, url: "/audios/6segmarcelo.mp3"
  { id: 15, t: "Segundo aire", p: "energetico", m: "tarde", f: "video", d: 9, premium: true,url: "/audios/6segmarcelo.mp3" desc: "Reactívate cuando la tarde te pesa." },url: "/audios/6segmarcelo.mp3"
  { id: 16, t: "Apaga el día con calma", p: "energetico", m: "noche", f: "audio", d: 7, premium: true,url: "/audios/6segmarcelo.mp3" desc: "Baja revoluciones y suelta la energía acumulada." },url: "/audios/6segmarcelo.mp3"
];

const MOMENTS = [
  { key: "mañana", label: "Mañana", sub: "Despierta", emoji: "☀" },url: "/audios/6segmarcelo.mp3"
  { key: "pausa", label: "Pausa", sub: "Respira", emoji: "❀" },url: "/audios/6segmarcelo.mp3"
  { key: "tarde", label: "Tarde", sub: "Reenfoca", emoji: "✿" },url: "/audios/6segmarcelo.mp3"
  { key: "noche", label: "Noche", sub: "Descansa", emoji: "☾" },url: "/audios/6segmarcelo.mp3"
];

/* ============================ HELPERS ============================ */
const grad = (c) => `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
const honey = "#E0883B";
const forest = "#2E5339";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return { hi: "Buenos días", moment: "mañana" };
  if (h < 18) return { hi: "Buenas tardes", moment: "tarde" };
  return { hi: "Buenas noches", moment: "noche" };
}

/* leaf decoration */
const Leaf = ({ size = 60, color = "#8DB46A", style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <path d="M85 15C50 15 15 35 15 75c0 5 5 10 10 10 40 0 70-35 70-70 0 0-5 0-10 0Z" fill={color} opacity="0.9" />
    <path d="M25 75C45 55 65 35 85 15" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.55" strokeLinecap="round" />
  </svg>
);

/* ============================ APP ============================ */
export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [obStep, setObStep] = useState(0);
  const [mood, setMood] = useState(null);
  const [goal, setGoal] = useState(null);

  const [tab, setTab] = useState("home");
  const [player, setPlayer] = useState(null);
  const [paywall, setPaywall] = useState(false);
  const [pro, setPro] = useState(false);

  const [streak] = useState(4);
  const [minutes, setMinutes] = useState(86);
  const [done, setDone] = useState(12);

  const openSession = (s) => {
    if (s.premium && !pro) setPaywall(true);
    else setPlayer(s);
  };
  const completeSession = (s) => {
    setMinutes((m) => m + s.d);
    setDone((d) => d + 1);
    setPlayer(null);
  };

  return (
    <div style={shell.wrap}>
      <style>{CSS}</style>
      <div style={shell.phone}>
        {/* fondo orgánico */}
        <div style={shell.blobA} className="float-slow" />
        <div style={shell.blobB} className="float-slower" />
        <Leaf size={120} color="rgba(141,180,106,0.22)" style={{ position: "absolute", top: 60, right: -20, transform: "rotate(25deg)", zIndex: 0 }} />
        <Leaf size={90} color="rgba(224,136,59,0.16)" style={{ position: "absolute", bottom: 120, left: -18, transform: "rotate(200deg)", zIndex: 0 }} />

        <div style={shell.screen}>
          {!onboarded ? (
            <Onboarding step={obStep} setStep={setObStep} mood={mood} setMood={setMood} goal={goal} setGoal={setGoal} finish={() => setOnboarded(true)} />
          ) : (
            <>
              {tab === "home" && <Home goal={goal} streak={streak} minutes={minutes} done={done} pro={pro} openSession={openSession} goExplore={() => setTab("explore")} openPaywall={() => setPaywall(true)} />}
              {tab === "explore" && <Explore pro={pro} openSession={openSession} />}
              {tab === "profile" && <Profile streak={streak} minutes={minutes} done={done} pro={pro} openPaywall={() => setPaywall(true)} />}
              <BottomNav tab={tab} setTab={setTab} />
            </>
          )}
          {player && <Player session={player} onClose={() => setPlayer(null)} onComplete={completeSession} />}
          {paywall && <Paywall onClose={() => setPaywall(false)} onSubscribe={() => { setPro(true); setPaywall(false); }} />}
        </div>
      </div>
    </div>
  );
}

/* ============================ ONBOARDING ============================ */
function Onboarding({ step, setStep, mood, setMood, goal, setGoal, finish }) {
  const moods = ["Agotado", "Tenso", "Neutral", "Tranquilo", "Pleno"];
  const goals = [
    { k: "calma", t: "Encontrar calma", g: PILLARS.emocional.grad },
    { k: "dormir", t: "Dormir mejor", g: PILLARS.fisico.grad },
    { k: "foco", t: "Recuperar el foco", g: PILLARS.mental.grad },
    { k: "energia", t: "Tener más energía", g: PILLARS.energetico.grad },
  ];

  return (
    <div style={ob.wrap} className="fade-in">
      <div style={ob.dots}>{[0, 1, 2].map((i) => <span key={i} style={{ ...ob.dot, ...(i <= step ? ob.dotOn : {}) }} />)}</div>

      {step === 0 && (
        <div style={ob.center}>
          <div className="grow" style={ob.sun}>
            <Leaf size={64} color="#fff" style={{ opacity: 0.95 }} />
          </div>
          <h1 style={ob.bigTitle}>Amigo<br />Estrés</h1>
          <p style={ob.lead}>Tu estrés no es tu enemigo. Es una señal. Aquí aprendes a escucharla y a volver a tu equilibrio — en pequeños momentos del día.</p>
          <button style={btn.primary} onClick={() => setStep(1)}>Empezar</button>
        </div>
      )}

      {step === 1 && (
        <div style={ob.block}>
          <h2 style={ob.q}>¿Cómo llegas hoy?</h2>
          <p style={ob.sub}>No hay respuesta correcta. Solo nota dónde estás.</p>
          <div style={ob.moodCol}>
            {moods.map((m) => (
              <button key={m} onClick={() => setMood(m)} style={{ ...ob.moodRow, ...(mood === m ? ob.moodRowOn : {}) }}>
                {m}{mood === m && <span style={{ color: forest }}>❀</span>}
              </button>
            ))}
          </div>
          <button style={{ ...btn.primary, opacity: mood ? 1 : 0.4 }} disabled={!mood} onClick={() => setStep(2)}>Continuar</button>
        </div>
      )}

      {step === 2 && (
        <div style={ob.block}>
          <h2 style={ob.q}>¿Qué buscas ahora?</h2>
          <p style={ob.sub}>Cuidaremos tu inicio según tu intención.</p>
          <div style={ob.goalGrid}>
            {goals.map((gl) => (
              <button key={gl.k} onClick={() => setGoal(gl.k)} style={{ ...ob.goalCard, background: goal === gl.k ? grad(gl.g) : "#fff", color: goal === gl.k ? "#fff" : "#2C3A30", borderColor: goal === gl.k ? "transparent" : "rgba(46,83,57,0.14)" }}>{gl.t}</button>
            ))}
          </div>
          <button style={{ ...btn.primary, opacity: goal ? 1 : 0.4 }} disabled={!goal} onClick={finish}>Entrar</button>
        </div>
      )}
    </div>
  );
}

/* ============================ HOME ============================ */
function Home({ streak, minutes, done, pro, openSession, goExplore, openPaywall }) {
  const { hi, moment } = greeting();
  const featured = SESSIONS.find((s) => s.m === moment && (!s.premium || pro)) || SESSIONS[0];
  const fp = PILLARS[featured.p];

  return (
    <div style={page.scroll} className="fade-in">
      <div style={{ padding: "52px 22px 14px" }}>
        <p style={home.hi}>{hi}, amigo</p>
        <h1 style={home.title}>Tu momento de hoy</h1>
      </div>

      <div style={home.streakRow}>
        <div style={home.streakBadge}><span style={{ fontSize: 16 }}>❀</span><span>{streak} días seguidos</span></div>
        <div style={home.streakDots}>{[...Array(7)].map((_, i) => <span key={i} style={{ ...home.sd, ...(i < streak ? home.sdOn : {}) }} />)}</div>
      </div>

      <div style={{ padding: "0 22px" }}>
        <button onClick={() => openSession(featured)} style={{ ...home.featured, background: grad(fp.grad) }}>
          <Leaf size={150} color="rgba(255,255,255,0.16)" style={{ position: "absolute", top: -30, right: -30, transform: "rotate(30deg)" }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <span style={home.featuredTag}>{fp.name} · {FMT[featured.f]}</span>
            <h3 style={home.featuredTitle}>{featured.t}</h3>
            <p style={home.featuredDesc}>{featured.desc}</p>
            <div style={home.playPill}>▶ {featured.d} min</div>
          </div>
        </button>
      </div>

      <div style={{ padding: "26px 22px 8px" }}><p style={home.sectionLabel}>Según tu día</p></div>
      <div style={home.momentsRow}>
        {MOMENTS.map((mo) => {
          const s = SESSIONS.find((x) => x.m === mo.key);
          return (
            <button key={mo.key} onClick={() => openSession(s)} style={home.momentCard}>
              <span style={home.momentEmoji}>{mo.emoji}</span>
              <span style={home.momentLabel}>{mo.label}</span>
              <span style={home.momentSub}>{mo.sub}</span>
            </button>
          );
        })}
      </div>

      <div style={{ padding: "24px 22px 8px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <p style={home.sectionLabel}>Para ti</p>
        <button onClick={goExplore} style={home.seeAll}>Ver todo</button>
      </div>
      <div style={{ padding: "0 22px 12px" }}>
        {SESSIONS.slice(4, 8).map((s) => <SessionRow key={s.id} s={s} pro={pro} onClick={() => openSession(s)} />)}
      </div>

      {!pro && (
        <div style={{ padding: "6px 22px 26px" }}>
          <button onClick={openPaywall} style={home.proBanner}>
            <Leaf size={70} color="rgba(46,83,57,0.12)" style={{ position: "absolute", top: -10, right: 10, transform: "rotate(40deg)" }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <p style={{ margin: 0, fontWeight: 700, color: forest }}>Cultiva tu jardín completo</p>
              <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "rgba(46,83,57,0.7)" }}>Toda la biblioteca · 7 días gratis</p>
            </div>
            <span style={{ fontSize: 20, color: forest, position: "relative", zIndex: 2 }}>→</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================ EXPLORE ============================ */
function Explore({ pro, openSession }) {
  const [active, setActive] = useState("mental");
  const p = PILLARS[active];
  const list = SESSIONS.filter((s) => s.p === active);

  return (
    <div style={page.scroll} className="fade-in">
      <div style={{ padding: "52px 22px 6px" }}>
        <h1 style={home.title}>Explorar</h1>
        <p style={home.hi}>Cuatro caminos de vuelta a tu calma</p>
      </div>

      <div style={explore.tabs}>
        {Object.entries(PILLARS).map(([k, v]) => (
          <button key={k} onClick={() => setActive(k)} style={{ ...explore.tab, background: active === k ? grad(v.grad) : "#fff", color: active === k ? "#fff" : "#3A4A3E", borderColor: active === k ? "transparent" : "rgba(46,83,57,0.12)" }}>{v.name}</button>
        ))}
      </div>

      <div style={{ padding: "4px 22px 10px" }}>
        <div style={{ ...explore.pillarHead, background: p.soft }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={p.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
          <span style={{ color: p.ink }}>{p.tag}</span>
        </div>
      </div>

      <div style={{ padding: "0 22px 24px" }}>
        {list.map((s) => <SessionRow key={s.id} s={s} pro={pro} onClick={() => openSession(s)} />)}
      </div>
    </div>
  );
}

/* ============================ SESSION ROW ============================ */
function SessionRow({ s, pro, onClick }) {
  const p = PILLARS[s.p];
  const locked = s.premium && !pro;
  const fIcon = { audio: "♪", video: "▶", texto: "✎" }[s.f];
  return (
    <button onClick={onClick} style={row.card}>
      <div style={{ ...row.thumb, background: grad(p.grad) }}><span style={{ fontSize: 17 }}>{fIcon}</span></div>
      <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
        <p style={row.title}>{s.t}</p>
        <p style={row.meta}>{FMT[s.f]} · {s.d} min · {p.name}</p>
      </div>
      {locked ? <span style={{ ...row.lock, color: p.ink }}>❀</span> : <span style={row.go}>›</span>}
    </button>
  );
}

/* ============================ PLAYER ============================ */
function Player({ session, onClose, onComplete }) {
  const total = session.d * 60;
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const p = PILLARS[session.p];
  const ref = useRef();

  useEffect(() => {
    if (!playing) return;
    ref.current = setInterval(() => setElapsed((e) => (e >= total ? (clearInterval(ref.current), total) : e + 1)), 100);
    return () => clearInterval(ref.current);
  }, [playing, total]);

  const pct = (elapsed / total) * 100;
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const finished = elapsed >= total;

  return (
    <div style={{ ...player.wrap, background: `linear-gradient(160deg, ${p.grad[0]}, ${p.grad[1]})` }} className="slide-up">
      <Leaf size={220} color="rgba(255,255,255,0.1)" style={{ position: "absolute", top: -40, left: -50, transform: "rotate(20deg)" }} />
      <Leaf size={160} color="rgba(255,255,255,0.08)" style={{ position: "absolute", bottom: 80, right: -40, transform: "rotate(210deg)" }} />

      <div style={player.top}>
        <button onClick={onClose} style={player.close}>✕</button>
        <span style={player.topTag}>{p.name} · {FMT[session.f]}</span>
        <span style={{ width: 34 }} />
      </div>

      <div style={player.body}>
        <div className="grow" style={player.bigOrb}><span style={{ fontSize: 30, color: "#fff" }}>{{ audio: "♪", video: "▶", texto: "✎" }[session.f]}</span></div>
        <h2 style={player.title}>{session.t}</h2>
        <p style={player.desc}>{session.desc}</p>
      </div>

      <div style={player.controls}>
        <div style={player.barTrack}><div style={{ ...player.barFill, width: `${pct}%` }} /></div>
        <div style={player.times}><span>{fmt(elapsed)}</span><span>{fmt(total)}</span></div>
        {!finished ? (
          <div style={player.btnRow}>
            <button style={player.skip} onClick={() => setElapsed((e) => Math.max(0, e - 15))}>«15</button>
            <button style={player.play} onClick={() => setPlaying((x) => !x)}>{playing ? "❚❚" : "▶"}</button>
            <button style={player.skip} onClick={() => setElapsed((e) => Math.min(total, e + 15))}>15»</button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#fff", marginBottom: 14, fontSize: 15 }}>Sesión completada ❀ Respira hondo.</p>
            <button style={{ ...btn.primary, background: "#fff", color: forest }} onClick={() => onComplete(session)}>Terminar</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ PROFILE ============================ */
function Profile({ streak, minutes, done, pro, openPaywall }) {
  const stats = [{ v: minutes, l: "minutos" }, { v: streak, l: "días de racha" }, { v: done, l: "sesiones" }];
  const achievements = [
    { e: "🌱", t: "Primer brote", on: true },
    { e: "🌿", t: "7 días verdes", on: streak >= 7 },
    { e: "🍃", t: "Ritual diario", on: done >= 10 },
    { e: "🌳", t: "Mes en raíz", on: false },
  ];
  return (
    <div style={page.scroll} className="fade-in">
      <div style={{ padding: "52px 22px 10px" }}><h1 style={home.title}>Tu jardín</h1></div>

      <div style={prof.statsRow}>
        {stats.map((s, i) => <div key={i} style={prof.stat}><p style={prof.statV}>{s.v}</p><p style={prof.statL}>{s.l}</p></div>)}
      </div>

      <div style={{ padding: "22px 22px 6px" }}><p style={home.sectionLabel}>Lo que has cultivado</p></div>
      <div style={prof.achGrid}>
        {achievements.map((a, i) => (
          <div key={i} style={{ ...prof.ach, opacity: a.on ? 1 : 0.4 }}>
            <span style={{ ...prof.achOrb, background: a.on ? grad([honey, "#C9781F"]) : "rgba(46,83,57,0.08)" }}>{a.e}</span>
            <span style={prof.achT}>{a.t}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: "22px 22px 30px" }}>
        {pro ? (
          <div style={prof.proActive}>
            <span style={{ fontSize: 18 }}>🌳</span>
            <div><p style={{ margin: 0, fontWeight: 700, color: forest }}>Amigo Premium activo</p><p style={{ margin: "2px 0 0", fontSize: 12.5, color: "rgba(46,83,57,0.6)" }}>Tu jardín completo, siempre contigo</p></div>
          </div>
        ) : (
          <button onClick={openPaywall} style={{ ...home.proBanner, width: "100%" }}>
            <div><p style={{ margin: 0, fontWeight: 700, color: forest }}>Hazte Premium</p><p style={{ margin: "3px 0 0", fontSize: 12.5, color: "rgba(46,83,57,0.7)" }}>7 días gratis, luego elige tu plan</p></div>
            <span style={{ fontSize: 20, color: forest }}>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================ PAYWALL ============================ */
function Paywall({ onClose, onSubscribe }) {
  const [plan, setPlan] = useState("anual");
  const benefits = [
    "Toda la biblioteca de sesiones",
    "Programas guiados de varios días",
    "Descarga y escucha sin conexión",
    "Sesiones nuevas cada semana",
    "Seguimiento de tu progreso",
  ];
  return (
    <div style={pay.wrap} className="slide-up">
      <Leaf size={200} color="rgba(141,180,106,0.18)" style={{ position: "absolute", top: -30, right: -40, transform: "rotate(35deg)", zIndex: 0 }} />
      <button onClick={onClose} style={pay.close}>✕</button>
      <div style={pay.content}>
        <div className="grow" style={pay.orb}><Leaf size={42} color="#fff" /></div>
        <h2 style={pay.title}>Amigo Premium</h2>
        <p style={pay.sub}>Tu equilibrio, sin límites.</p>

        <div style={pay.benefits}>
          {benefits.map((b, i) => <div key={i} style={pay.bRow}><span style={{ color: honey, fontSize: 15 }}>❀</span><span>{b}</span></div>)}
        </div>

        <div style={pay.plans}>
          <button onClick={() => setPlan("anual")} style={{ ...pay.plan, ...(plan === "anual" ? pay.planOn : {}) }}>
            <span style={pay.bestTag}>Mejor valor · −58%</span>
            <span style={pay.planName}>Anual</span>
            <span style={pay.planPrice}>$3.490 / mes</span>
            <span style={pay.planNote}>Facturado $41.880 al año</span>
          </button>
          <button onClick={() => setPlan("mensual")} style={{ ...pay.plan, ...(plan === "mensual" ? pay.planOn : {}) }}>
            <span style={pay.planName}>Mensual</span>
            <span style={pay.planPrice}>$8.290 / mes</span>
            <span style={pay.planNote}>Cancela cuando quieras</span>
          </button>
        </div>

        <button style={{ ...btn.primary, background: grad([honey, "#C9781F"]) }} onClick={onSubscribe}>Empezar 7 días gratis</button>
        <p style={pay.fine}>Luego {plan === "anual" ? "$41.880/año" : "$8.290/mes"}. Cancela en cualquier momento.</p>
      </div>
    </div>
  );
}

/* ============================ BOTTOM NAV ============================ */
function BottomNav({ tab, setTab }) {
  const items = [
    { k: "home", l: "Inicio", d: "M3 11 12 3l9 8M5 10v10h5v-6h4v6h5V10" },
    { k: "explore", l: "Explorar", d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.5 6.5-2 5-5 2 2-5 5-2Z" },
    { k: "profile", l: "Mi jardín", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" },
  ];
  return (
    <div style={nav.wrap}>
      {items.map((it) => {
        const on = tab === it.k;
        return (
          <button key={it.k} onClick={() => setTab(it.k)} style={nav.item}>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={on ? forest : "rgba(46,83,57,0.4)"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={it.d} /></svg>
            <span style={{ ...nav.label, color: on ? forest : "rgba(46,83,57,0.4)" }}>{it.l}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================ ESTILOS ============================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
button { cursor: pointer; font-family: inherit; border: none; }
.fade-in { animation: fadeIn .5s ease both; }
.slide-up { animation: slideUp .35s cubic-bezier(.2,.8,.2,1) both; }
@keyframes fadeIn { from { opacity:0; transform: translateY(8px);} to { opacity:1; transform:none;} }
@keyframes slideUp { from { opacity:0; transform: translateY(40px);} to { opacity:1; transform:none;} }
@keyframes grow { 0%,100% { transform: scale(1) rotate(-2deg);} 50% { transform: scale(1.06) rotate(2deg);} }
@keyframes float { 0%,100% { transform: translate(0,0);} 50% { transform: translate(10px,-14px);} }
@keyframes floatS { 0%,100% { transform: translate(0,0);} 50% { transform: translate(-12px,12px);} }
.grow { animation: grow 6s ease-in-out infinite; }
.float-slow { animation: float 12s ease-in-out infinite; }
.float-slower { animation: floatS 16s ease-in-out infinite; }
div::-webkit-scrollbar { width: 0; }
@media (prefers-reduced-motion: reduce) { .grow,.float-slow,.float-slower,.fade-in,.slide-up { animation: none !important; } }
`;

const FS = "'Fraunces', Georgia, serif";
const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const ink = "#243027";

const shell = {
  wrap: { minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#C7D2B4", padding: 20 },
  phone: { position: "relative", width: 390, height: 800, maxHeight: "94vh", borderRadius: 42, overflow: "hidden", background: "#F1F3E8", boxShadow: "0 40px 110px rgba(46,83,57,.3), 0 0 0 1px rgba(46,83,57,.06)", fontFamily: BODY },
  blobA: { position: "absolute", top: -90, left: -70, width: 280, height: 280, borderRadius: "46% 54% 60% 40% / 50% 42% 58% 50%", background: "radial-gradient(circle at 40% 40%, rgba(141,180,106,.35), transparent 70%)", filter: "blur(8px)", zIndex: 0 },
  blobB: { position: "absolute", bottom: -80, right: -60, width: 260, height: 260, borderRadius: "60% 40% 50% 50% / 45% 55% 45% 55%", background: "radial-gradient(circle at 60% 60%, rgba(224,136,59,.22), transparent 70%)", filter: "blur(10px)", zIndex: 0 },
  screen: { position: "absolute", inset: 0, zIndex: 1, color: ink },
};

const page = { scroll: { position: "absolute", inset: 0, overflowY: "auto", paddingBottom: 92 } };

const btn = {
  primary: { width: "100%", padding: "16px", borderRadius: 18, background: "linear-gradient(135deg,#4A8B5F,#2E5339)", color: "#fff", fontSize: 15.5, fontWeight: 600, letterSpacing: .2, boxShadow: "0 12px 26px rgba(46,83,57,.3)" },
};

const ob = {
  wrap: { position: "absolute", inset: 0, padding: "0 26px", display: "flex", flexDirection: "column" },
  dots: { display: "flex", gap: 7, justifyContent: "center", padding: "58px 0 0" },
  dot: { width: 28, height: 4, borderRadius: 4, background: "rgba(46,83,57,.18)" },
  dotOn: { background: forest },
  center: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingBottom: 40 },
  sun: { width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #9CCB7B, #4A8B5F 55%, #2E5339)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 40px rgba(46,83,57,.4)", marginBottom: 32 },
  bigTitle: { fontFamily: FS, fontSize: 48, fontWeight: 600, lineHeight: 1, margin: "0 0 18px", color: forest, letterSpacing: -0.5 },
  lead: { fontSize: 15.5, lineHeight: 1.6, color: "rgba(36,48,39,.72)", margin: "0 0 38px", maxWidth: 310 },
  block: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 30 },
  q: { fontFamily: FS, fontSize: 32, fontWeight: 600, margin: "0 0 8px", color: forest },
  sub: { fontSize: 14.5, color: "rgba(36,48,39,.6)", margin: "0 0 28px" },
  moodCol: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 },
  moodRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderRadius: 16, background: "#fff", color: ink, fontSize: 15, border: "1px solid rgba(46,83,57,.1)" },
  moodRowOn: { background: "rgba(74,139,95,.12)", border: `1px solid ${forest}` },
  goalGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 30 },
  goalCard: { padding: "26px 16px", borderRadius: 20, fontSize: 15, fontWeight: 600, border: "1px solid", minHeight: 92, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", boxShadow: "0 6px 16px rgba(46,83,57,.06)" },
};

const home = {
  hi: { fontSize: 14.5, color: "rgba(36,48,39,.6)", margin: "0 0 4px" },
  title: { fontFamily: FS, fontSize: 34, fontWeight: 600, margin: 0, lineHeight: 1.1, color: forest, letterSpacing: -0.5 },
  streakRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 22px 18px" },
  streakBadge: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: forest },
  streakDots: { display: "flex", gap: 5 },
  sd: { width: 8, height: 8, borderRadius: "50%", background: "rgba(46,83,57,.16)" },
  sdOn: { background: forest },
  featured: { width: "100%", borderRadius: 26, padding: 24, textAlign: "left", color: "#fff", position: "relative", overflow: "hidden", boxShadow: "0 18px 36px rgba(46,83,57,.22)" },
  featuredTag: { fontSize: 12, letterSpacing: 1, textTransform: "uppercase", opacity: .9, fontWeight: 700 },
  featuredTitle: { fontFamily: FS, fontSize: 26, fontWeight: 600, margin: "10px 0 8px", lineHeight: 1.15 },
  featuredDesc: { fontSize: 13.5, lineHeight: 1.5, opacity: .92, margin: "0 0 18px", maxWidth: 250 },
  playPill: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.25)", padding: "9px 16px", borderRadius: 30, fontSize: 13.5, fontWeight: 600 },
  sectionLabel: { fontSize: 12.5, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(46,83,57,.55)", margin: 0, fontWeight: 700 },
  seeAll: { background: "none", color: honey, fontSize: 13, fontWeight: 700 },
  momentsRow: { display: "flex", gap: 11, padding: "0 22px", overflowX: "auto" },
  momentCard: { flex: "0 0 auto", width: 78, height: 96, borderRadius: 20, background: "#fff", border: "1px solid rgba(46,83,57,.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, color: ink, boxShadow: "0 6px 14px rgba(46,83,57,.05)" },
  momentEmoji: { fontSize: 20, color: forest },
  momentLabel: { fontSize: 13, fontWeight: 700, color: forest },
  momentSub: { fontSize: 11, color: "rgba(46,48,39,.5)" },
  proBanner: { position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, width: "100%", padding: "16px 20px", borderRadius: 20, background: "linear-gradient(135deg,#F3D77E,#E8B964)", boxShadow: "0 14px 28px rgba(224,136,59,.28)" },
};

const explore = {
  tabs: { display: "flex", gap: 8, padding: "16px 22px", overflowX: "auto" },
  tab: { flex: "0 0 auto", padding: "9px 18px", borderRadius: 30, fontSize: 13.5, fontWeight: 600, border: "1px solid", boxShadow: "0 4px 10px rgba(46,83,57,.05)" },
  pillarHead: { display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 16, fontSize: 13.5, fontWeight: 600 },
};

const row = {
  card: { display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "11px 12px", borderRadius: 18, background: "#fff", marginBottom: 10, border: "1px solid rgba(46,83,57,.07)", boxShadow: "0 4px 12px rgba(46,83,57,.04)" },
  thumb: { width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 },
  title: { margin: 0, fontSize: 15, fontWeight: 600, color: ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  meta: { margin: "3px 0 0", fontSize: 12.5, color: "rgba(36,48,39,.5)" },
  lock: { fontSize: 16, paddingRight: 6 },
  go: { color: "rgba(46,83,57,.4)", fontSize: 22, paddingRight: 8 },
};

const player = {
  wrap: { position: "absolute", inset: 0, zIndex: 30, display: "flex", flexDirection: "column", color: "#fff", overflow: "hidden" },
  top: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "54px 22px 0", position: "relative", zIndex: 2 },
  close: { width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.2)", color: "#fff", fontSize: 14 },
  topTag: { fontSize: 12.5, letterSpacing: 1, textTransform: "uppercase", opacity: .9, fontWeight: 700 },
  body: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 30px", position: "relative", zIndex: 2 },
  bigOrb: { width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 34, border: "1px solid rgba(255,255,255,.3)" },
  title: { fontFamily: FS, fontSize: 30, fontWeight: 600, margin: "0 0 12px", lineHeight: 1.15 },
  desc: { fontSize: 14.5, lineHeight: 1.6, opacity: .9, maxWidth: 280 },
  controls: { padding: "0 30px 46px", position: "relative", zIndex: 2 },
  barTrack: { height: 5, borderRadius: 5, background: "rgba(255,255,255,.25)", overflow: "hidden" },
  barFill: { height: "100%", background: "#fff", borderRadius: 5, transition: "width .15s linear" },
  times: { display: "flex", justifyContent: "space-between", fontSize: 12, opacity: .85, margin: "8px 0 26px" },
  btnRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 28 },
  skip: { background: "none", color: "rgba(255,255,255,.9)", fontSize: 13, fontWeight: 700 },
  play: { width: 72, height: 72, borderRadius: "50%", background: "#fff", color: forest, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 26px rgba(0,0,0,.2)" },
};

const prof = {
  statsRow: { display: "flex", gap: 12, padding: "14px 22px 0" },
  stat: { flex: 1, background: "#fff", borderRadius: 18, padding: "18px 8px", textAlign: "center", border: "1px solid rgba(46,83,57,.07)", boxShadow: "0 4px 12px rgba(46,83,57,.04)" },
  statV: { fontFamily: FS, fontSize: 30, fontWeight: 700, margin: 0, color: honey },
  statL: { fontSize: 11.5, color: "rgba(36,48,39,.55)", margin: "4px 0 0" },
  achGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 22px" },
  ach: { display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 16, padding: "14px", border: "1px solid rgba(46,83,57,.07)", boxShadow: "0 4px 12px rgba(46,83,57,.04)" },
  achOrb: { width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  achT: { fontSize: 13, fontWeight: 600, color: forest },
  proActive: { display: "flex", alignItems: "center", gap: 13, padding: "16px 18px", borderRadius: 18, background: "rgba(224,136,59,.12)", border: "1px solid rgba(224,136,59,.32)" },
};

const pay = {
  wrap: { position: "absolute", inset: 0, zIndex: 40, background: "linear-gradient(180deg,#F1F3E8,#E3E9D6)", display: "flex", flexDirection: "column", overflowY: "auto", color: ink },
  close: { position: "absolute", top: 50, right: 20, width: 34, height: 34, borderRadius: "50%", background: "rgba(46,83,57,.12)", color: forest, fontSize: 14, zIndex: 3 },
  content: { padding: "70px 26px 36px", position: "relative", zIndex: 2 },
  orb: { width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #9CCB7B, #4A8B5F 55%, #2E5339)", margin: "0 auto 22px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 34px rgba(46,83,57,.35)" },
  title: { fontFamily: FS, fontSize: 34, fontWeight: 600, textAlign: "center", margin: "0 0 6px", color: forest },
  sub: { textAlign: "center", fontSize: 15, color: "rgba(36,48,39,.65)", margin: "0 0 28px" },
  benefits: { display: "flex", flexDirection: "column", gap: 13, marginBottom: 28 },
  bRow: { display: "flex", alignItems: "center", gap: 12, fontSize: 14.5, color: ink },
  plans: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 22 },
  plan: { position: "relative", padding: "18px 20px", borderRadius: 18, background: "#fff", border: "1.5px solid rgba(46,83,57,.12)", display: "flex", flexDirection: "column", alignItems: "flex-start", color: ink },
  planOn: { border: `1.5px solid ${honey}`, background: "rgba(224,136,59,.08)" },
  bestTag: { position: "absolute", top: -10, right: 16, background: grad([honey, "#C9781F"]), color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 },
  planName: { fontSize: 16, fontWeight: 700, color: forest },
  planPrice: { fontSize: 19, fontWeight: 700, margin: "4px 0 2px", fontFamily: FS, color: forest },
  planNote: { fontSize: 12, color: "rgba(36,48,39,.55)" },
  fine: { textAlign: "center", fontSize: 11.5, color: "rgba(36,48,39,.5)", margin: "14px 0 0" },
};

const nav = {
  wrap: { position: "absolute", bottom: 0, left: 0, right: 0, height: 78, display: "flex", justifyContent: "space-around", alignItems: "center", paddingBottom: 14, background: "rgba(241,243,232,0.92)", backdropFilter: "blur(12px)", zIndex: 5, borderTop: "1px solid rgba(46,83,57,.08)" },
  item: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none" },
  label: { fontSize: 11, fontWeight: 700 },
};
