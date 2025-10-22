// BlackNetWebsite.jsx
import { useForm } from '@formspree/react';
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // ✅ Red tick icon
import { useEffect } from "react";
import './index.css';


/**
 * Requirements:
 * - Tailwind CSS configured
 * - framer-motion installed: npm i framer-motion
 *
 * Usage: import BlackNetWebsite from './BlackNetWebsite' and render it in your app.
 *
 * Color theme: red (accents), black (background), white (text).
 */

/* -------------------- Simple SVG Icons -------------------- */
const IconSpark = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
  </svg>
);
const IconMail = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M21 19H3V5h18v14z" />
  </svg>
);
const IconPhone = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 6.5A2.5 2.5 0 0 1 4.5 4h2.1a1 1 0 0 1 1 .8l.4 2a1 1 0 0 1-.3.9L6.9 9c.7 1.5 2 3.1 3.8 4.9 1.8 1.8 3.4 3.1 4.9 3.8l.8-1.8a1 1 0 0 1 .9-.3l2 .4a1 1 0 0 1 .8 1v2.1A2.5 2.5 0 0 1 17.5 22H6.5A2.5 2.5 0 0 1 4 19.5v-13z" />
  </svg>
);

/* -------------------- Small Helpers -------------------- */
const Section = ({ id, className = "", children }) => (
  <section id={id} className={`relative w-full mx-auto max-w-6xl px-6 md:px-10 ${className}`}>
    {children}
  </section>
);

const Reveal = ({ children, duration = 0.7, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

/* -------------------- Animated Backdrop (global, subtle) -------------------- */
const AnimatedBackdrop = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Large floating red gradient blob (slow vertical float) */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute -left-40 -top-24 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(220,38,38,0.12), transparent 35%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.12), transparent 40%)" }}
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute right-[-10rem] bottom-[-6rem] h-80 w-80 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.04), transparent 40%)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255, 255, 255, 0.02)_1px,transparent_1px),linear-gradient(225deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
    </div>
  );
};

/* -------------------- Navbar -------------------- */

const Navbar = () => {
  // 🧠 Smooth scroll for anchor links
  useEffect(() => {
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach((l) =>
      l.addEventListener("click", (e) => {
        const href = l.getAttribute("href");
        if (!href) return;
        if (href.startsWith("#")) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      })
    );
    return () => {
      links.forEach((l) => l.removeEventListener("click", () => {}));
    };
  }, []);

  return (
    // 📌 Sticky navbar with blur and soft border
    <div className="sticky top-0 z-40 w-full border-b backdrop-blur-md bg-black/40 border-white/6">
      <div className="flex items-center justify-between h-16 max-w-6xl px-6 mx-auto md:px-10">
        
        {/* 🔗 Logo + Brand Name */}
        <a href="#home" className="flex items-center gap-3">
          {/* 🖼️ Logo Image (no border, clean glow) */}
          <div className="w-20 h-20 overflow-hidden rounded-md shadow-md md:h-22 md:w-22 bg-white/10">
            <img
              src="/logo.png" // ✅ Make sure logo.png is in your public folder
              alt="Black.Net Logo"
              className="object-contain w-full h-full"
            />
          </div>

          {/* 📝 Brand Text */}
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wider text-red-400">BLACK.NET</p>
            <p className="text-xs text-white/70">IT Solutions</p>
          </div>
        </a>

        {/* 🧭 Navigation Links */}
        <nav className="items-center hidden gap-8 text-sm md:flex text-white/80">
          {[
            ["Services", "#services"],
            ["Process", "#process"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={label} href={href} className="transition-colors hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        {/* 🎯 CTA Button */}
        <div className="flex items-center gap-3">
          <a href="#contact" className="inline-flex">
            <button className="px-4 py-2 text-sm font-medium text-white transition bg-red-600 shadow rounded-xl hover:bg-red-700">
              Start a Project
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};


/* -------------------- Hero (video removed as requested) -------------------- */
const Hero = () => {
  return (
    <Section id="home" className="pt-16 pb-24">
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-white/3 text-white/70">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Elevate your digital presence
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Black.Net IT Solutions
            </h1>

            <p className="max-w-xl mt-4 text-base md:text-lg text-white/70">
              We build secure, scalable, and stunning software, web, mobile & cloud with a human-first design approach. Crafting digital experiences that convert.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#services">
                <button className="px-5 py-3 font-semibold text-white transition bg-red-600 shadow-lg rounded-2xl hover:bg-red-700">
                  Explore Services
                </button>
              </a>
              <a href="#contact">
                <button className="px-5 py-3 transition rounded-2xl text-white/90 hover:bg-white/5">
                  Contact Us
                </button>
              </a>
            </div>

            <div className="grid max-w-lg grid-cols-3 gap-6 mt-10">
              {["99.9% uptime", "24/7 support", "Agile delivery"].map((kpi) => (
                <div
                  key={kpi}
                  className="p-4 text-sm border rounded-2xl bg-white/3 text-white/80 border-gray-400/40"
                >
                  {kpi}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-black/60 to-white/3 blur-2xl" />
            <div className="relative p-4 overflow-hidden rounded-3xl bg-black/30 backdrop-blur-md">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-red-700/30 to-black/10"
              >
                <motion.div
                  initial={{ opacity: 0.06 }}
                  animate={{ opacity: [0.06, 0.12, 0.06], x: [-80, 80, -80] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 100%)",
                    mixBlendMode: "overlay",
                  }}
                />
                <div className="relative grid w-full h-full place-items-center">
                  <div className="grid grid-cols-3 gap-3 px-6">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0], opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 6 + i * 0.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                        className="rounded-md h-14 w-14 bg-white/6 backdrop-blur-sm"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-3 gap-3 mt-4 text-xs text-white/70">
                {["Web Apps", "Mobile Apps", "E-Commerce", "UI/UX", "IT Consultations", "+ More"].map((t) => (
                  <div
                    key={t}
                    className="px-2 py-1 text-center border rounded-lg bg-white/3 border-gray-400/40"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

/* -------------------- Services -------------------- */
const services = [
  { title: "Full-Stack Development", desc: "Web apps with React, Node and modern APIs." },
  { title: "Mobile Solutions", desc: "Flutter & React Native for cross-platform apps." },
  { title: "UI/UX Design Solutions", desc: "Intuitive interfaces and user journeys tailored for engagement." },
  { title: "E-Commerce", desc: "Scalable online stores with integrated payment and inventory systems." },
  { title: "IT Consultations", desc: "Expert guidance on architecture, security, and performance optimization." },
  { title: "Flyers & Resume Supporting", desc: "Professional design and content support for resumes and promotional materials" },
];

const Services = () => (
  // Full-width section gradient (animated) as requested
  <Section id="services" className="py-10 md:py-11">
    <div className="relative -mx-6 overflow-hidden md:-mx-10 rounded-3xl">
      {/* animated gradient background across full section */}
      <motion.div
        className="absolute inset-0 -z-10 section-gradient"
        aria-hidden
        initial={{ opacity: 0.96 }}
        animate={{ opacity: [0.96, 1, 0.96] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="max-w-6xl px-6 mx-auto md:px-10">
        <Reveal>
          <div className="text-center">
            <p className="text-sm tracking-widest text-red-200">SERVICES</p>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">What we do best</h2>
            <p className="max-w-2xl mx-auto mt-3 text-white/80">
              Strategy, design and engineering delivered with precision and polish.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              {/* Service cards: floating + hover = bold + red glow (Option A) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6 + (i % 3) * 0.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="p-5 transition-all border group rounded-2xl border-white/8 bg-black/30 backdrop-blur-sm hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="grid w-10 h-10 font-semibold text-white bg-red-600 rounded-lg place-items-center">
                    {s.title.charAt(0)}
                  </div>
                  <div>
                    <div className="text-lg font-medium text-white transition-all group-hover:font-extrabold">
                      {/* Title becomes extra bold on hover */}
                      {s.title}
                    </div>
                    <div className="mt-1 text-sm text-white/70">{s.desc}</div>
                  </div>
                </div>

                {/* subtle outline + red glow on hover */}
                <div
                  aria-hidden
                  className="h-0 mt-4 transition-all pointer-events-none"
                  style={{ boxShadow: "none" }}
                />
                {/* Extra glow overlay */}
                <div className="absolute inset-0 transition-opacity opacity-0 pointer-events-none rounded-2xl group-hover:opacity-100"
                     style={{ boxShadow: "0 10px 30px rgba(220,38,38,0.12), inset 0 1px 0 rgba(255,255,255,0.02)" }} />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

/*--------------------------Soft Landing--------------------------------*/

const SoftLanding = () => (
  <Section id="softlanding" className="pt-10 pb-32 overflow-visible">
    <Reveal>
      <div className="relative flex flex-col items-center justify-start h-[26rem] md:h-[30rem]">
        {/* 🪂 Parachute Floating Higher */}
        <motion.img
          src="/para.png"
          alt="Parachute"
          className="absolute z-10 w-36 md:w-48 -top-6"
          animate={{
            x: [0, 20, 0, -20, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 📝 Benefits Message */}
        <div className="z-10 max-w-4xl text-center mt-36">
          <p className="text-sm tracking-widest text-red-400">SOFT LANDING</p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            Your journey starts with care
          </h2>

          {/* 💬 Bubble Grid */}
          <div className="grid grid-cols-1 gap-4 mt-6 text-sm sm:grid-cols-2 text-white/80 md:text-base">
            {[
              ["🎁", "First 100 clients get 20%+ in early discounts"],
              ["🌐", "Free hosting for selected web projects"],
              ["🧭", "Free domain guidance & onboarding"],
              ["🔒", "Lifetime support for all services"],
              ["🚀", "Priority access to new features"],
              ["🎨", "Dedicated design consultation for your brand"],
              ["", "✨ & more"],
            ].map(([icon, text], i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 border border-white/20 rounded-full bg-black/30 backdrop-blur-sm hover:bg-white/10 transition shadow-[0_0_12px_rgba(255,255,255,0.15)] ${
                  i === 6 ? "sm:col-span-2 justify-center" : ""
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="flex-1 text-center">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  </Section>
);
/* -------------------- Process -------------------- */
const Process = () => {
  const steps = [
    { t: "Discover", d: "We define goals, users and success metrics." },
    { t: "Design", d: "Wireframes & polished UI with rapid feedback." },
    { t: "Develop", d: "Modern tech, clean code, test-driven builds." },
    { t: "Deploy", d: "Automate pipelines, monitor, launch with confidence." },
    { t: "Grow", d: "Analyze data, improve, deliver ongoing value." },
  ];
  return (
    <Section id="process" className="py-0">
      <div className="relative -mx-6 overflow-hidden md:-mx-10 rounded-3xl">
        <motion.div
          className="absolute inset-0 -z-10 section-gradient"
          aria-hidden
          initial={{ opacity: 0.95 }}
          animate={{ opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-6xl px-6 mx-auto md:px-10">
          <Reveal>
            <div className="text-center">
              <p className="text-sm tracking-widest text-red-200">PROCESS</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Simple. Powerful. Repeatable.</h2>
              <p className="max-w-2xl mx-auto mt-3 text-white/80">A battle-tested flow that keeps projects on time and on budget.</p>
            </div>
          </Reveal>

          <div className="grid gap-6 mt-10 md:grid-cols-5 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.04}>
                {/* Process cards: floating + hover = bold + slight zoom (Option B) */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6 + (i % 4) * 0.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                  className="p-4 transition-transform border rounded-2xl border-white/8 bg-black/25 transform-gpu hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid w-10 h-10 font-semibold text-white bg-red-600 rounded-lg place-items-center">{i + 1}</div>
                    <div>
                      <div className="font-medium text-white transition-all hover:font-extrabold">{s.t}</div>
                      <div className="mt-1 text-sm text-white/70">{s.d}</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

/* -------------------- About -------------------- */
const About = () => (
  <Section id="about" className="py-20">
    <Reveal>
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* LEFT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5 }}
        >
          <p className="text-sm tracking-widest text-red-400">ABOUT</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Building ideas that inspire and deliver impact
          </h2>
          <p className="mt-4 leading-relaxed text-white/70">
            We’re a passionate Sri Lanka–born tech startup shaping digital experiences 
            that help businesses grow. From bold new startups to established brands, 
            we turn ideas into meaningful, high-quality products built for the future.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8 text-sm text-center">
            {["10+ clients", "20+ projects", "5★ reviews"].map((m) => (
              <motion.div
                key={m}
                whileHover={{ scale: 1.05 }}
                className="p-4 border rounded-xl border-white/10 bg-white/5 text-white/80 backdrop-blur-sm"
              >
                {m}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-red-700/30 to-black/30 blur-2xl" />
          <div className="relative p-8 border rounded-3xl border-white/10 bg-black/30 backdrop-blur-lg">
            <ul className="space-y-5 text-white/80">
              {[
                "Global mindset, local passion",
                "Partnerships built on trust",
                "Innovative, design-driven solutions",
                "Code, creativity & collaboration in harmony",
              ].map((item, index) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-3"
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                      duration: 4,
                      delay: index * 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}

                >
                  <CheckCircle
                    className="flex-shrink-0 mt-1 text-red-500"
                    size={20}
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Reveal>
  </Section>
);

/*--------------------------Launch pad------------------------------------------*/
const LaunchPad = () => (
  <Section id="launchpad" className="py-20">
    <Reveal>
     <div className="relative grid items-center gap-10 md:grid-cols-2">
        {/* 🚀 Rocket Image */}
        <div className="relative">
          <img
            src="/rocket.png"
            alt="Rocket"
            className="w-32 mx-auto animate-rocket"
          />
        </div>


        {/* 🚀 Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
        >
          <p className="text-sm tracking-widest text-red-400">LAUNCHPAD</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Ideas that lift off
          </h2>
          <p className="mt-4 leading-relaxed text-white/70">
            Every great product starts with a spark. At Black.Net, we fuel that spark with design, code, and care—ready to launch your vision into reality.
          </p>
        </motion.div>
      </div>
    </Reveal>
  </Section>
);

/* -------------------- Contact -------------------- */

export const Contact = () => {
  const [state, handleSubmit] = useForm("movkzbzq"); // ✅ your Formspree form ID

  return (
    <Section id="contact">
      {/* 🧾 Contact Form with Red Gradient Blur */}
      <Reveal delay={0.05}>
        <div className="relative max-w-3xl mx-auto mt-12">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-red-700/30 to-black/30 blur-2xl animate-gradient-pulse" />
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-md shadow-[0_0_20px_#ef4444]/30">
            {state.succeeded ? (
              <div className="py-10 space-y-6 text-center text-white/80">
                <p className="text-lg">🎉 Thank you! We’ve received your message and will get back to you soon.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 text-sm font-medium text-white transition border border-white/30 rounded-xl hover:bg-white/10"
                >
                  ← Back to form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  required
                  placeholder="Name"
                  className="p-3 text-white border placeholder-white/50 rounded-xl bg-black/30 border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Email"
                  className="p-3 text-white border placeholder-white/50 rounded-xl bg-black/30 border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  name="phone"
                  placeholder="Mobile / WhatsApp Number"
                  className="p-3 text-white border placeholder-white/50 rounded-xl bg-black/30 border-white/10 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <textarea
                  name="message"
                  placeholder="How can we help?"
                  rows={6}
                  className="p-3 text-white border placeholder-white/50 rounded-xl bg-black/30 border-white/10 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="flex items-center justify-between mt-2 sm:col-span-2">
                  <p className="text-xs text-white/60">By sending, you agree to our privacy policy.</p>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="px-5 py-2 font-medium text-white transition bg-red-600 shadow-md rounded-2xl hover:bg-red-700 hover:shadow-red-500/40"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
};


/* -------------------- Footer -------------------- */
export const Footer = () => (
  <footer
    className="relative mt-20 overflow-hidden text-white border-t border-white/10 bg-black/80 bg-[url('/footer.png')] bg-cover bg-center bg-no-repeat animate-zoom-slow"

  >
    {/* 🔴 Red Waving SVG Background */}
    <div className="absolute bottom-0 left-0 w-full -z-10">
      <svg
        className="w-full h-24 md:h-32 animate-wave"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#dc2626"
          fillOpacity="0.3"
          d="M0,160L60,165.3C120,171,240,181,360,176C480,171,600,149,720,160C840,171,960,213,1080,202.7C1200,192,1320,128,1380,96L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
    </div>

    <Section className="relative z-10 py-16 bg-black/80">
      <div className="grid items-start gap-10 md:grid-cols-4">
        {/* 🖼️ Logo + Brand Story */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 md:h-14 md:w-14 overflow-hidden rounded-md shadow-md bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.1)]">
              <img
                src="/logo.png"
                alt="Black.Net Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-red-400">BLACK.NET</p>
              <p className="text-sm text-white/70">Emotionally Intelligent IT</p>
            </div>
          </div>
          <p className="max-w-xs text-sm text-white/60">
            Born in Sri Lanka, built for the world. We craft secure, scalable, and stunning digital experiences.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <p className="mb-4 text-sm font-semibold text-red-400">Explore</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#services" className="transition hover:text-white">Services</a></li>
            <li><a href="#process" className="transition hover:text-white">Process</a></li>
            <li><a href="#about" className="transition hover:text-white">About</a></li>
            <li><a href="#contact" className="transition hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* 🚀 Call to Action */}
        <div>
          <p className="mb-4 text-sm font-semibold text-red-400">Let’s Build Together</p>
          <p className="mb-4 text-sm text-white/70">Got an idea? We’d love to hear it. Let’s co-create something powerful.</p>
          <a href="#contact">
            <button className="px-4 py-2 text-sm font-medium text-white transition bg-red-600 shadow rounded-xl hover:bg-red-700">
              Start a Project
            </button>
          </a>
        </div>

        {/* 📞 Contact Info */}
        <div>
          <p className="mb-4 text-sm font-semibold text-red-400">Say Hello</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2"><IconMail /> itblacknet@gmail.com</li>
            <li className="flex items-center gap-2"><IconPhone /> +94 74 272 8982</li>
            <li>Colombo, Sri Lanka</li>
          </ul>
        </div>
      </div>

      {/* 🧾 Bottom Bar */}
      <div className="flex flex-col items-center justify-between pt-6 mt-12 text-xs border-t border-white/10 md:flex-row text-white/50">
        <p>© {new Date().getFullYear()} Black.Net IT Solutions. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </Section>
  </footer>
);

/* -------------------- Page -------------------- */
export default function BlackNetWebsite() {
  return (
    <div className="min-h-screen text-white bg-black selection:bg-red-600/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <SoftLanding />
        <Process />
        <About />
        <LaunchPad />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}