import { useState } from "react";

const Benifit = () => {
    const [activeIndex, setActiveIndex] = useState(null);

  const items = [
    {
      title: 'Customer–Centric',
      description:
        "Being customer-centric is the compass that guides our travel services. We prioritize our customers' needs.",
      iconPath:
        'M5.121 17.804A9.003 9.003 0 0012 21c2.486 0 4.735-.998 6.363-2.617M15 11a3 3 0 11-6 0 3 3 0 016 0zm4 0a9 9 0 11-8.25-4.968',
    },
    {
      title: 'Sustainable Travel',
      description:
        'Committed to responsible and eco-conscious journeys, traveling the world with minimal footprints and pollutions.',
      iconPath: 'M12 2a10 10 0 00-7.1 17.1A10 10 0 1012 2z',
    },
    {
      title: 'Authentic Experiences',
      description:
        "We deliver journeys that immerse you in unforgettable encounter with the world's diverse cultures & landscapes.",
      iconPath:
        'M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z',
    },
    {
      title: 'Quality Guides',
      description:
        'Every journey will be led by knowledgeable, passionate experts who enhance your travel experience.',
      iconPath:
        'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    },
  ];

    return (
      <section className="bg-[#F6FCDF] py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12">
          {/* Left Text */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
            <h2 className="text-7xl font-light leading-tight mb-6">
              Our true <span className="italic">beliefs</span>
              <br />
              for <span className="italic">your</span> benefits
            </h2>
            </div>
            <div>
            <p className="text-gray-700 text-lg ">
              Our beliefs aren't just words; they are the foundation of every
              adventure we offer. With high commitment to sustainability,
              authenticity, and customer-centricity, we ensure that every trip you
              take with us is valuable.
            </p>
            </div>
          </div>
  
          {/* Right Boxes */}
          <div className="md:w-1/2 flex flex-col rounded-2xl overflow-hidden border border-[#859F3D]">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`flex items-start gap-4 p-6 border-b border-[#859F3D] cursor-pointer ${
            activeIndex === index ? 'bg-black text-white' : ''
          }`}
        >
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            <svg
              className={`w-6 h-6 ${
                activeIndex === index ? 'text-white' : 'text-gray-800'
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={item.iconPath}
              />
            </svg>
          </div>
          <div>
            <h3
              className={`font-semibold ${
                activeIndex === index ? 'text-white' : 'text-gray-800'
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-sm mt-1 ${
                activeIndex === index ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
        </div>
      </section>
    );
  };
  
  export default Benifit;
  