import Image from "next/image";
import { Calculator, BookOpen, Palette, Beaker } from "lucide-react";
import img1 from "../../../public/landing/learningStyle2.jpeg"
import img2 from "../../../public/landing/learningStyle1.jpeg"

const features = [
  {
    title: "Advanced Mathematics",
    description: "Personalized support for subjects ranging from foundational arithmetic to advanced calculus.",
    icon: <Calculator className="w-6 h-6" />,
    bgColor: "bg-[#FFEDD5]", // Light Orange
    className: "col-span-4 md:col-span-1",
  },
  {
    image: img1,
    alt: "Student engaged in focused remote learning",
    className: "col-span-4 md:col-span-2 row-span-1",
  },
  {
    title: "Language & Literature",
    description: "Master comprehensive reading, academic writing, and critical literary analysis.",
    icon: <BookOpen className="w-6 h-6" />,
    bgColor: "bg-[#FCE7F3]", // Light Pink
    className: "col-span-4 md:col-span-1",
  },
  {
    image: img2,
    alt: "Tutor providing interactive mentorship via laptop",
    className: "col-span-4 md:col-span-2 row-span-1",
  },
  {
    title: "Creative Arts",
    description: "Nurture artistic expression through digital design, multimedia production, and creative theory.",
    icon: <Palette className="w-6 h-6" />,
    bgColor: "bg-[#F3E8FF]", // Light Purple
    className: "col-span-4 md:col-span-1",
  },
  {
    title: "Scientific Inquiry",
    description: "Explore biology, physics, and chemistry through rigorous curricula and virtual experiments.",
    icon: <Beaker className="w-6 h-6" />,
    bgColor: "bg-[#ECFCCB]", // Light Lime
    className: "col-span-4 md:col-span-1",
  },
];

export function LearningStyles() {
  return (
    <div className="w-full bg-card">
      <section className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Tailored to Every Academic Goal
          </h2>
          <p className="text-muted-foreground text-md font-medium">
            Comprehensive subject matter delivered through expert-led mentorship
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
          {features.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${item.className} ${item.bgColor || "bg-slate-100"
                }`}
            >
              {item.image ? (
                <div className="relative dark:border w-full h-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt || "Educational resource preview"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
              ) : (
                <div className="p-8 flex flex-col h-full relative z-10">
                  <div className="mb-auto text-slate-800 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 origin-left">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-indigo-600">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-50 transition-opacity duration-300 group-hover:text-slate-900">
                      {item.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}