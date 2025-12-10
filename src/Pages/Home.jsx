import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  Send,
  Code2,
  Link2,
  Globe,
} from "lucide-react";


import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Driven to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          AI & ML
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 ${
              text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-45"
            } transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Unstop Icon Component
const UnstopIcon = ({ className, ...props }) => (
  <span className={`${className} font-bold text-sm`} {...props}>
    Un
  </span>
);

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["AI & ML Engineering Student", "Full-Stack Development Enthusiast"];
const TECH_STACK = ["Python", "C++", "Java", "Javascript", "SQL"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/abhishekgiri04" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/abhishek-giri04/" },
  { icon: Code2, link: "https://leetcode.com/u/AbhishekGiri0405/" },
  { icon: Link2, link: "https://linktr.ee/CodeAG.io" },
  { icon: Globe, link: "https://agnix.netlify.app" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);



  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      mirror: false,
      offset: 50
    });
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);



  return (
    <div className="min-h-screen bg-[#030014]" id="Home">
      <div className="relative z-10 transition-all duration-1000 opacity-100">
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-0 min-h-screen overflow-visible">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left order-1 lg:order-1" data-aos="fade-right" data-aos-delay="200">
              <StatusBadge />
              <MainTitle />

              <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">{text}</span>
                <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
              </div>

              <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light" data-aos="fade-up" data-aos-delay="1000">
                AI & ML Enthusiast | Crafting Innovative, Scalable, and Elegant Digital Solutions.
              </p>

              <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                {TECH_STACK.map((tech, i) => <TechStack key={i} tech={tech} />)}
              </div>

              <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                <CTAButton href="#Contact" text="Contact" icon={Mail} />
              </div>

              <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                {SOCIAL_LINKS.map((social, i) => <SocialLink key={i} {...social} />)}
              </div>
            </div>

            {/* Right Column - Robot */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-[60%] h-auto lg:h-[502px] xl:h-[627px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0 overflow-visible -ml-64"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Glowing Background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 ml-12">
                  <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-3xl"></div>
                  <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl"></div>
                </div>

                {/* Robot Animation */}
                <div className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ml-40 mt-8 ${
                  isHovering ? "scale-105" : "scale-100"
                }`}>
                  <iframe 
                    src="https://my.spline.design/genkubgreetingrobot-MW4W3iAFsJj5olFfT1MhN0TH/" 
                    frameBorder="0" 
                    width="100%" 
                    height="100%" 
                    className="w-full h-full"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <div className="absolute bottom-0 right-0 w-40 h-16 z-50" style={{ background: '#060020', backgroundImage: 'linear-gradient(to right, #4f4f4f25 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f25 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
