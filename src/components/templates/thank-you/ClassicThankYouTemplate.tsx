import type { InvitationRecord } from "@/types/invitation";

type ClassicThankYouTemplateProps = {
  invitation: InvitationRecord;
};

export function ClassicThankYouTemplate({
  invitation,
}: ClassicThankYouTemplateProps) {
  return (
    <article className="mx-auto min-h-screen w-full max-w-[430px] bg-[#fffaf6] px-6 py-12 text-center text-[#3c3028] sm:my-8 sm:min-h-0 sm:px-8">
      <p className="text-sm font-medium text-[#b18466]">
        Classic Thank You Template
      </p>
      <h1 className="mt-5 text-3xl font-light tracking-normal">
        감사의 마음을 전합니다
      </h1>
      <p className="mt-8 whitespace-pre-line text-base leading-8 text-[#5f5147]">
        {invitation.message}
      </p>
      <p className="mt-10 text-xl font-semibold">
        {invitation.groom_name} & {invitation.bride_name}
      </p>
    </article>
  );
}
