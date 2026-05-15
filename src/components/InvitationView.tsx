import type { InvitationRecord } from "@/types/invitation";

type InvitationViewProps = {
  invitation: InvitationRecord;
};

export function InvitationView({ invitation }: InvitationViewProps) {
  const weddingDate = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long",
  }).format(new Date(`${invitation.wedding_date}T00:00:00`));

  return (
    <article className="mx-auto min-h-screen w-full max-w-md bg-white px-6 py-12 text-center text-[#2f2a25] shadow-sm">
      <p className="text-sm font-medium text-[#8a6f55]">Wedding Invitation</p>
      <h1 className="mt-5 text-3xl font-semibold tracking-normal">
        {invitation.title}
      </h1>

      <div className="mt-10 rounded-md bg-[#f8f5f0] px-5 py-8">
        <p className="text-2xl font-semibold">
          {invitation.groom_name}
          <span className="mx-3 text-lg font-normal text-[#8a6f55]">&</span>
          {invitation.bride_name}
        </p>
        <p className="mt-5 text-base leading-7 text-[#6d6258]">
          {weddingDate}
        </p>
        <p className="mt-2 text-base leading-7 text-[#6d6258]">
          {invitation.venue}
        </p>
      </div>

      <p className="mt-10 whitespace-pre-line text-base leading-8 text-[#4f463d]">
        {invitation.message}
      </p>
    </article>
  );
}
