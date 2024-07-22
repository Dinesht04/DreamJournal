import Ripple from "@/components/magicui/ripple";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { IconBrandGithubFilled, IconBrandTwitterFilled, IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { SparklesCore } from "@/components/ui/sparkles";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Reviews } from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/magicui/cool-mode";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {

  const foot = "<DKT/>";

  const content = [
    {
      title: "Unlock Your Inner World",
      description:
        "Write your way to clarity and self-discovery.  This journaling and dream analysis website helps you explore your thoughts, feelings, and subconscious mind.  Track your moods, set goals, and gain valuable insights from your nightly adventures.  Sign up for your free trial today and unlock the power within!",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Unlock Your Inner World
        </div>
      ),
    },
    {
      title: "Pen to Purpose",
      description:
        "Journaling isn't just about reflection - it's a powerful tool for growth.  Set intentions, track progress, and overcome challenges.  This platform allows you to combine journaling with goal setting and action planning.  Transform your everyday scribbles into a roadmap for a fulfilling life!",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
           Pen to Purpose
        </div>
      ),
    },
    {
      title: "Mind & Soul Synergy",
      description:
        "Looking for a holistic approach to self-care?  Our website combines the benefits of journaling and dream analysis for a truly integrated experience.  Explore your inner world, cultivate self-awareness, and create a more balanced and fulfilling life.  Join our community of mindful individuals and embark on a journey of self-discovery!",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Mind & Soul Synergy
        </div>
      ),
    },
    {
      title: "It's Easier Than You Think!",
      description:
        "Ever woken up from a dream feeling confused or curious?  Our dream analysis tool helps you decipher the hidden messages your subconscious is sending.  Record your dreams, explore symbol meanings, and gain a deeper understanding of yourself. Unravel the mysteries of your sleep with our user-friendly dream dictionary!",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
         It's Easier Than You Think!
        </div>
      ),
    },
  ];

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "#hero",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#footer",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

    const words : { text: string, className: string}[]  = [
      {
        text: "Stop",
        className: "text-white"
      },
      {
        text: "Waking",
        className: "text-white"
      },
      {
        text: "Up",
        className: "text-white"
      },
      {
        text: "Confused:",
        className: "text-white"
      },
      {
        text: "Decode",
        className: "text-purple-500 dark:text-blue-500",
      },
      {
        text: "Your",
        className: "text-white"
      },
      {
        text: "Dreams",
        className: "text-purple-500 dark:text-blue-500",
      },
    ];
  

  return (
    <>
    <div className="		">
      
      <div id="navbar">

      <FloatingNav navItems={navItems} />

      </div>

      <div id="actionableButton">

      <div className=" h-[32rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background=""
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full "
            particleColor="#FFFFFF"
          />
        </div>

        <h1 className="md:text-5xl text-2xl  font-bold text-center text-white relative z-20">
        <TypewriterEffectSmooth words={words} />
        
        <CoolMode>
      <Link href="/getStarted">  <Button className="w-40 h-10 rounded-xl bg-purple-600 hover:bg-purple-800  border dark:border-white border-transparent text-white text-sm">
          Join now
        </Button></Link>
      </CoolMode>
      </h1>
            
      </div>
              
          
       
          
      </div>

      <div id="hero" className="bg-purple-300	">
      
          <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black">
            What Do Your <span className="text-purple-800	"  >Dreams</span>  Really Mean? <br/> Find Out NOW with <span className="text-amber-800">AI</span>
            </p>
            <Ripple />
        </div>
        
      </div>
      
      <div className="">
      <StickyScroll content={content} contentClassName="bg-teal-300" />
      </div>
      <div id="reviews">
          <Reviews/>
      </div>
      <div id="footer">
          <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
    
          <Boxes />
          <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
            Made with love
          </h1>
          <div className="">
            
            <Link href={'https://x.com/Dinesht_04'} ><p className="text-center mt-2 m-4 text-neutral-300 relative z-20"> {foot} </p></Link>
           
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
}
