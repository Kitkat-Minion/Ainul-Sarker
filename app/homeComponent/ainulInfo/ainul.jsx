"use client";

import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import AinulImage from "../../../public/Images/ainul.jpg";
import Image from "next/image";

export default function Ainul() {
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEnd = document.getElementById("heroEnd");
      if (!heroEnd) return;
      const rect = heroEnd.getBoundingClientRect();
      setShowStickyNav(rect.top <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cardStyle =
    "py-8 bg-gradient-to-r from-[rgba(135,206,250,0.1)] to-[rgba(255,255,255,0.05)] backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(135,206,235,0.8)]";

  return (
    <div className="text-white font-sans max-w-full mx-auto relative z-[100000]">
      {/* Hero Section */}
      <section
        className="flex flex-col justify-center items-center h-screen text-center px-4"
        id="heroSection"
      >
        <div className="px-[20%] py-[8%] rounded-xl bg-[linear-gradient(to_right,transparent,rgba(10,191,255,0.05),transparent)] backdrop-blur-sm shadow-md">
          <Image
            src={AinulImage}
            width={1000}
            height={1000}
            alt="Profile"
            className="w-64 h-64 mx-auto mb-4 rounded-full border-2 border-white/30 shadow-md"
          />
          <h1 className="text-[52px] font-bold mb-2">
            <span className="bg-gradient-to-r from-indigo-300 to-sky-400 bg-clip-text text-transparent">
              Ainul Sarker
            </span>
          </h1>
          <p className="text-white max-w-xl mx-auto textlg">
            Ainal is a front-end developer with experience in HTML, CSS,
            JavaScript, React JS, Next.js, PHP, and Laravel. He builds scalable
            front-end solutions and full-featured web platforms with strong
            UI/UX design focus.
          </p>
        </div>
      </section>

      {/* Intersection marker */}
      <div id="heroEnd" className="h-[1px]"></div>

      {/* Sticky Navbar */}
      {showStickyNav && (
        <nav
          id="stickyNav"
          className="fixed top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10 w-full flex justify-center items-center gap-6 px-4 py-3 transition-all duration-300"
        >
          {"Education,Experience,Projects,Hobbies,Contact"
            .split(",")
            .map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="px-3 py-2 text-sky-300 hover:bg-sky-300/10 border border-transparent hover:border-sky-300 rounded-md transition"
              >
                {section}
              </a>
            ))}
          <a
            href="#heroSection"
            className="text-sky-400 text-2xl hover:scale-110 transition"
            aria-label="Home"
          >
            <AiFillHome />
          </a>
        </nav>
      )}

      {/* Education Section */}
      <section id="education" className="px-6 pt-24">
        <h2 className="text-2xl font-semibold text-center mb-8">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`bg-white/5 p-6 rounded-xl border border-white/20 shadow-lg ${cardStyle}`}
          >
            <h3 className="text-xl font-medium">
              BSc in Computer Science and Engineering
            </h3>
            <p>Dhaka International University, 2019 - 2023 (CGPA 3.46)</p>
          </div>
          <div
            className={`bg-white/5 p-6 rounded-xl border border-white/20 shadow-lg ${cardStyle}`}
          >
            <h3 className="text-xl font-medium">
              Diploma in Computer Science and Technology
            </h3>
            <p>Feni Computer Institute, 2015 - 2019 (CGPA 2.96)</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 pt-24">
        <h2 className="text-2xl font-semibold text-center mb-8">Experience</h2>
        <div className="flex flex-col gap-6">
          <div
            className={`bg-white/5 p-6 rounded-xl border border-white/20 transition-transform hover:-translate-y-1 hover:border-cyan-300 hover:bg-gradient-to-r hover:from-sky-500/10 hover:to-pink-400/10 ${cardStyle}`}
          >
            <h3 className="text-xl font-medium">
              Front End Software Developer
            </h3>
            <p>Nov 2022 - Present</p>
            <p>
              Designed and developed responsive UIs using React, HTML, CSS, and
              JavaScript. Contributed to both client- and admin-side platforms
              in multi-vendor environments.
            </p>
          </div>
          <div
            className={`bg-white/5 p-6 rounded-xl border border-white/20 transition-transform hover:-translate-y-1 hover:border-cyan-300 hover:bg-gradient-to-r hover:from-sky-500/10 hover:to-pink-400/10 ${cardStyle}`}
          >
            <h3 className="text-xl font-medium">PHP with Laravel Training</h3>
            <p>SEIP BITM, Dhaka | Aug 2022 - Oct 2022</p>
            <p>
              Completed project-based training on Laravel 9 under SEIP program
              at BASIS Institute of Technology and Management.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 pt-24">
        <h2 className="text-2xl font-semibold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "https://buyrealbrands.com/",
            "https://ukbd.app/",
            "https://247-property.co.uk/",
            "https://akashsolution.com/",
            "https://hnbrothers.co.uk/",
            "https://welovezamzam.com/",
            "https://coffe4u.com/",
          ].map((url, idx) => (
            <div
              key={idx}
              className={`bg-white/5 p-4 rounded-lg border border-white/10 hover:border-sky-200 ${cardStyle}`}
            >
              <h3 className="text-lg font-semibold text-slate-100 mb-2 text-center">
                {url.replace("https://", "").replace("www.", "").split("/")[0]}
              </h3>

              <img
                src={`https://api.microlink.io/?url=${encodeURIComponent(
                  url
                )}&screenshot=true&meta=false&embed=screenshot.url`}
                alt={`Preview of ${url}`}
                className="w-full h-auto rounded-md border border-white/10"
              />

              <a
                href={url}
                target="_blank"
                className="block text-center mt-3 text-sky-400 text-sm underline"
              >
                Open in New Tab
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="px-6 pt-24">
        <h2 className="text-2xl font-semibold text-center mb-8">Hobbies</h2>
        <div className="flex flex-col gap-6">
          {[
            {
              title: "Photography",
              desc: "Capturing moments with creative flair.",
            },
            {
              title: "Chess",
              desc: "Strategic gameplay and critical thinking.",
            },
          ].map((hobby, idx) => (
            <div
              key={idx}
              className={`bg-white/5 p-6 rounded-xl border border-white/20 transition-transform hover:-translate-y-1 hover:border-cyan-300 hover:bg-gradient-to-r hover:from-sky-500/10 hover:to-pink-400/10 ${cardStyle}`}
            >
              <h3 className="text-xl font-medium">{hobby.title}</h3>
              <p>{hobby.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-24">
        <h2 className="text-2xl font-semibold text-center mb-8">Contact</h2>
        <div className="flex justify-center flex-row gap-6">
          {[
            { label: "Email", value: "ainulsorker@gmail.com" },
            { label: "Phone", value: "+8801626415104" },
            { label: "LinkedIn", value: "linkedin.com/in/ainul-sarker/" },
          ].map((contact, idx) => (
            <div
              key={idx}
              className={`bg-white/5 p-6 rounded-xl border border-white/20 ${cardStyle}`}
            >
              <h3 className="text-xl font-medium">{contact.label}</h3>
              <p>{contact.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
