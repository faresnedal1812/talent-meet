import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { Link } from "react-router";
import { SignInButton } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* NAVBAR */}
      <nav className="bg-base-100/80 backdrop-blur-md sticky top-0 border-b border-primary/20 shadow-lg z-50">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <Link
            to={"/"}
            className="hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary via-secondary to-accent size-12 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="text-white size-6" />
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text font-black font-mono text-xl tracking-wider">
                  Talent Meet
                </span>
                <span className="text-xs text-base-content/70 font-medium">
                  Code Together
                </span>
              </div>
            </div>
          </Link>
          <SignInButton mode="modal">
            <button className="group bg-gradient-to-r from-primary via-secondary to-accent flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl text-white font-semibold transition-all duration-200">
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </SignInButton>
        </div>
      </nav>
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="badge badge-lg badge-primary font-medium">
              <ZapIcon className="size-4" />
              Real-time Collaboration
            </div>
            <h1 className="font-black text-5xl lg:text-7xl leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
                Code Together,
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>
            <p className="text-xl text-base-content/70 max-w-xl leading-relaxed">
              The ultimate platform for collaborative coding interviews and pair
              programming. Connect face-to-face, code in real-time, and ace your
              technical interviews.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Live Video Chat
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Multi-Language
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="group px-6 py-3 bg-gradient-to-r from-primary via-secondary to-accent text-black font-semibold flex items-center gap-2 rounded-xl shadow-lg hover:shadow-xl duration-200">
                  <span> Start Coding Now</span>
                  <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </SignInButton>
              <button className="btn btn-lg btn-outline">
                <VideoIcon className="size-4" />
                Watch Demo
              </button>
            </div>
            <div className="stats stats-vertical sm:stats-horizontal bg-base-100 shadow-lg">
              <div className="stat">
                <span className="stat-value text-primary">10K+</span>
                <span className="stat-title">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-value text-secondary">50K+</span>
                <span className="stat-title">Sessions</span>
              </div>
              <div className="stat">
                <span className="stat-value text-accent">99.9%</span>
                <span className="stat-title">Uptime</span>
              </div>
            </div>
          </div>
          {/* RIGHT IMAGE */}

          <img
            src="/hero.png"
            alt="CodeCollab Platform"
            className="w-full h-auto border-4 border-base-100 shadow-2xl rounded-3xl hover:scale-105 hover:transition-transform duration-500"
          />
        </div>
      </div>

      {/* FEATURE SECTION */}
      <div className="max-w-7xl mx-auto p-20">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl mb-4">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base-content/70 text-lg">
            Powerful features designed to make your coding interviews seamless
            and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* FEATURE 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body flex items-center text-center">
              <div className="size-16 flex items-center justify-center bg-primary/10 rounded-2xl mb-4">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during
                interviews
              </p>
            </div>
          </div>
          {/* FEATURE 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body flex items-center text-center">
              <div className="size-16 flex items-center justify-center bg-primary/10 rounded-2xl mb-4">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multiple
                language support
              </p>
            </div>
          </div>
          {/* FEATURE 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body flex items-center text-center">
              <div className="size-16 flex items-center justify-center bg-primary/10 rounded-2xl mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions, and learn from each other
                in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
