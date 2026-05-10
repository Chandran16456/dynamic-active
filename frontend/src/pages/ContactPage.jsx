import AnimatedPage from "../components/motion/AnimatedPage";

export default function ContactPage() {
  return (
    <AnimatedPage className="min-h-screen bg-transparent px-6 py-20">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-white/90 p-10 shadow-xl backdrop-blur-md">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#fc362d]">
          Contact Us
        </p>

        <h1 className="text-5xl font-black text-slate-950">
          Let&apos;s Chat
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          Reach out to Dynamic Active for questions, demos, or support.
        </p>
      </div>
    </AnimatedPage>
  );
}
