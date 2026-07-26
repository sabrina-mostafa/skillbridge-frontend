"use client";

import Image from "next/image";

import img3 from "../../../public/landing/hero1.jpeg";
import img2 from "../../../public/landing/hero2.jpeg";
import img4 from "../../../public/landing/hero3.jpeg";
import img1 from "../../../public/landing/hero4.jpeg";
import img5 from "../../../public/landing/hero5.jpeg";
import img6 from "../../../public/landing/hero6.avif";

const imageData = [
  { src: img1, alt: "Student 1" },
  { src: img2, alt: "Student 2" },
  { src: img3, alt: "Student 3" },
  { src: img4, alt: "Student 4" },
  { src: img5, alt: "Student 5" },
  { src: img6, alt: "Student 6" },
];

export function ImageStrip() {
  const heights = ["440px", "390px", "360px", "360px", "390px", "440px"];

  const transforms = [
    "perspective(400px) rotateY(20deg) skewY(8deg)",
    "perspective(500px) rotateY(15deg) skewY(5deg)",
    "perspective(600px) rotateY(10deg) skewY(1deg)",
    "perspective(600px) rotateY(-10deg) skewY(-1deg)",
    "perspective(500px) rotateY(-15deg) skewY(-5deg)",
    "perspective(400px) rotateY(-20deg) skewY(-8deg)",
  ];

  // Vertical offsets: 3rd and 4th images get top padding (pushed down)
  const verticalOffsets = ["-50px", "40px", "90px", "90px", "40px", "-50px"];

  
  return (
    <div className="w-full overflow-x-auto pb-12 pt-21 no-scrollbar">
      <div className="flex justify-start md:justify-center items-center gap-4 px-10 min-w-max mx-auto">
        {imageData.map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 overflow-hidden shadow-2xl transition-all duration-500 ease-in-out hover:scale-110 hover:z-50"
            style={{
              width: "280px",
              height: heights[i],
              transform: transforms[i],
              borderRadius: "30px",
              border: "4px solid white",
              backgroundColor: "#000",
              marginTop: verticalOffsets[i], // This pushes the image down
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="280px"
              priority={i < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}