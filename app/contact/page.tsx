import React from "react";

const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-24 px-6">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
          Contact
        </h1>
        <div className="h-1 bg-black w-20 mx-auto"></div>
      </header>

      <div className="bg-white border border-gray-100 p-8 md:p-12 shadow-sm rounded-lg">
        <p className="text-gray-600 font-serif mb-8 text-center italic">
          Have a question or want to collaborate? Send us a message!
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full border-gray-200 focus:border-black focus:ring-0 text-sm py-3"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full border-gray-200 focus:border-black focus:ring-0 text-sm py-3"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Subject</label>
            <input 
              type="text" 
              className="w-full border-gray-200 focus:border-black focus:ring-0 text-sm py-3"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Message</label>
            <textarea 
              className="w-full border-gray-200 focus:border-black focus:ring-0 text-sm py-3 min-h-[150px]"
              placeholder="Your message here..."
            ></textarea>
          </div>

          <div className="text-center">
            <button 
              type="button"
              className="bg-black text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors inline-block"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Email</h3>
          <p className="font-serif">hello@dailyblog.com</p>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Twitter</h3>
          <p className="font-serif">@TheDailyBlog</p>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Location</h3>
          <p className="font-serif">Worldwide</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
