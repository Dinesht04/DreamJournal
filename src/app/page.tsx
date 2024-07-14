import Ripple from "@/components/magicui/ripple";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
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

  const content = [
    {
      title: "Collaborative Editing",
      description:
        "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Collaborative Editing
        </div>
      ),
    },
    {
      title: "Real time changes",
      description:
        "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            IDK man some shit about editing
        </div>
      ),
    },
    {
      title: "Version control",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Version control
        </div>
      ),
    },
    {
      title: "Running out of content",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Running out of content
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
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
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
            Footer
          </h1>
          <p className="text-center mt-2 text-neutral-300 relative z-20">
            Enter Footer later
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
