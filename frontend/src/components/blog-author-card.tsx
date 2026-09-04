import Image from "next/image";

export function BlogAuthorCard() {
  return (
    <aside className="mt-12 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <Image
        src="/profile-ClwFbffV.jpg"
        alt="Ganesh Shah"
        width={56}
        height={56}
        className="size-14 rounded-full object-cover"
      />
      <p className="font-semibold text-white">Ganesh Shah</p>
    </aside>
  );
}
