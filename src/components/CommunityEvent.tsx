import React from "react";

const CommunityEvent = () => {
  return (
    <section className="relative h-[600px] bg-cover bg-center container mx-auto my-10 bg-[url('/assets/community-event.png')]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-end pb-20 px-10">
        <div className="container mx-auto px-5">
          <div className="text-white max-w-2xl">
            <span className="inline-block bg-red-600 text-white px-4 py-2 rounded text-sm mb-5">
              জরুরি সহযোগিতা
            </span>
            <h1 className="text-5xl font-bold mb-5">কমিউনিটি রক্তদান অভিযান</h1>
            <p className="text-lg leading-relaxed">
              এই সপ্তাহাতে সেন্ট্রাল হাসপাতালে জরুরি রক্তদান অভিযানে আমাদের সাথে
              যোগ দিন।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityEvent;
