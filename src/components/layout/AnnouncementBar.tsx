const messages = ["90-DAY MONEY BACK GUARANTEE", "FAST SHIPPING"];

function Group({ hidden = false }: { hidden?: boolean }) {
  // Repeat the messages so one group is always wider than a phone screen
  const items = Array.from({ length: 5 }).flatMap(() => messages);

  return (
    <div
      aria-hidden={hidden}
      className="marquee-group flex min-w-full shrink-0 items-center justify-around gap-[25px]"
    >
      {items.map((text, i) => (
        <div key={i} className="flex shrink-0 items-center gap-[25px]">
          <p className="whitespace-nowrap text-xs font-extrabold tracking-[0.5px] text-white">
            {text}
          </p>
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </div>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="announcement-bg flex select-none gap-[25px] overflow-hidden py-[5px]">
      <Group />
      <Group hidden />
    </div>
  );
}