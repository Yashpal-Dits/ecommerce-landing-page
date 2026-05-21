export default function MemberSection() {
  return (
    <section className="py-20 md:py-24 lg:py-28 bg-black text-white text-center" id="cta">
      <div className="w-11/12 max-w-2xl mx-auto">
        
        <p className="uppercase font-black text-xs md:text-sm text-gray-500 tracking-widest mb-4 md:mb-5">
          GENZ Club
        </p>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white mb-5 md:mb-6">
          Get first access to every fashion drop
        </h2>
      
        <p className="text-base mdz:text-lg text-gray-300 mb-10 md:mb-12 leading-relaxed">
          Join for member-only pricing, early outfit previews, and exclusive style edits.
        </p>
        
        <form 
          className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-stretch md:items-center flex-wrap" 
          onSubmit={(event) => event.preventDefault()}
        >
          <input 
            className="flex-1 min-w-0 md:min-w-48 px-5 md:px-6 py-3 md:py-4 bg-gray-900 border border-gray-700 text-white text-base md:text-lg rounded transition-colors duration-200 placeholder-gray-500 focus:outline-none focus:border-white"
            type="email" 
            placeholder="Enter your email" 
            aria-label="Email" 
            required 
          />
          <button 
            className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-bold uppercase text-sm md:text-base rounded transition-opacity duration-200 hover:opacity-90 whitespace-nowrap"
            type="submit"
          >
            Join Now
          </button>
        </form>
      </div>
    </section>
  );
}
