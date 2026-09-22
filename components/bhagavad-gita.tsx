import DottedSection from "./dotted-section";

export default function BhagavadGita() {
  return (
    <section aria-label="Bhagavad Gita shloka">
      <DottedSection className="px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-sans text-lg italic leading-loose text-neutral-100 sm:text-xl md:text-2xl">
            यो न हृष्यति न द्वेष्टि न शोचति न काङ्क्षति।
            <br />
            शुभाशुभपरित्यागी भक्तिमान्यः स मे प्रियः॥ १२.१७ ॥
          </p>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] tracking-wide text-neutral-400 sm:text-[11px]">
              महाभारतम् · भीष्मपर्व · श्रीमद्भगवद्गीता
            </p>
            <p className="font-mono text-[9px] tracking-wide text-neutral-500 sm:text-[10px]">
              अध्याय १२ · श्लोक १७
            </p>
          </div>
        </div>
      </DottedSection>
    </section>
  );
}