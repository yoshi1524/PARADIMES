export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest2 text-silver">{eyebrow}</p>
      )}
      <h2 className="rift font-display text-4xl uppercase leading-none text-bone md:text-5xl" data-text={title}>
        {title}
      </h2>
      {description && <p className="mt-4 text-ash">{description}</p>}
    </div>
  );
}
