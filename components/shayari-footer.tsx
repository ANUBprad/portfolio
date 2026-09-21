import Image from "next/image";

import SectionCard from "./section-card";
import shayari from "../shayari.jpg";

export default function ShayariFooter() {
  return (
    <SectionCard>
      <div className="flex flex-col gap-8 px-5 py-6 sm:flex-row sm:items-center sm:gap-10 sm:px-7">
        <Image
          src={shayari}
          alt="Eyes accompanying the Shayari"
          width={736}
          height={414}
          className="w-full rounded-lg border border-dotted border-neutral-700/70 sm:w-52 sm:shrink-0"
        />
        <blockquote
          className="text-base italic font-normal leading-relaxed text-heading sm:text-lg"
          style={{
            fontFamily:
              '"Nirmala UI", "Kohinoor Devanagari", "Mangal", "Lohit Devanagari", sans-serif',
          }}
        >
          &quot;तेरी आँखों का नशा कुछ ऐसा चढ़ा,
          <br />
          कि फिर कोई और नशा अच्छा नहीं लगा।&quot;
        </blockquote>
      </div>
    </SectionCard>
  );
}