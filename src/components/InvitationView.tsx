import type { InvitationRecord } from "@/types/invitation";
import Image from "next/image";
import type { ReactNode } from "react";

type InvitationViewProps = {
  invitation: InvitationRecord;
};

type InvitationSectionProps = {
  label: string;
  children: ReactNode;
};

function InvitationSection({ label, children }: InvitationSectionProps) {
  return (
    <section className="border-t border-[#eadfce] px-1 py-10 text-center">
      <p className="text-xs font-medium text-[#a17f63]">{label}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function InvitationView({ invitation }: InvitationViewProps) {
  if (invitation.card_type === "thank_you") {
    return <ThankYouInvitationView invitation={invitation} />;
  }

  return <WeddingInvitationView invitation={invitation} />;
}

function WeddingInvitationView({ invitation }: InvitationViewProps) {
  const weddingDate = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long",
  }).format(new Date(`${invitation.wedding_date}T00:00:00`));

  return (
    <article className="mx-auto min-h-screen w-full max-w-[430px] bg-[#fffaf3] px-6 py-8 text-center text-[#3f342c] sm:my-8 sm:min-h-0 sm:px-8 sm:py-10">
      <header className="pb-12">
        <div className="relative mx-auto mb-10 aspect-[4/5] w-full overflow-hidden rounded-t-full border border-[#eadfce] bg-[#f4ecdf]">
          {invitation.image_url ? (
            <Image
              src={invitation.image_url}
              alt={`${invitation.groom_name}, ${invitation.bride_name} 모바일초대장 메인 이미지`}
              fill
              sizes="(max-width: 430px) 100vw, 430px"
              className="object-cover"
              priority
            />
          ) : (
            <div
              aria-label="초대장 대표 이미지 영역"
              className="flex h-full w-full items-center justify-center"
            >
              <div className="h-20 w-px bg-[#d6c4ad]" />
            </div>
          )}
        </div>

        <p className="text-sm font-medium text-[#a17f63]">
          Wedding Invitation
        </p>
        <h1 className="mt-5 text-3xl font-light tracking-normal text-[#332922]">
          {invitation.title}
        </h1>
        <div className="mx-auto mt-7 h-px w-12 bg-[#d6c4ad]" />
        <p className="mt-8 text-3xl font-semibold tracking-normal text-[#332922]">
          {invitation.groom_name}
          <span className="mx-3 text-xl font-light text-[#a17f63]">&</span>
          {invitation.bride_name}
        </p>
      </header>

      <InvitationSection label="초대의 글">
        <p className="whitespace-pre-line text-base leading-8 text-[#5f5147]">
          {invitation.message}
        </p>
      </InvitationSection>

      <InvitationSection label="예식일">
        <p className="text-xl font-medium text-[#332922]">{weddingDate}</p>
      </InvitationSection>

      <InvitationSection label="장소">
        <p className="text-lg leading-8 text-[#4b4038]">{invitation.venue}</p>
      </InvitationSection>

      <InvitationSection label="마음 전하는 글">
        <p className="text-base leading-8 text-[#5f5147]">
          함께해 주시는 따뜻한 마음을 오래 간직하겠습니다.
        </p>
      </InvitationSection>
    </article>
  );
}

function ThankYouInvitationView({ invitation }: InvitationViewProps) {
  return (
    <article className="mx-auto min-h-screen w-full max-w-[430px] bg-[#fffaf6] px-6 py-8 text-center text-[#3c3028] sm:my-8 sm:min-h-0 sm:px-8 sm:py-10">
      <header className="pb-10">
        <p className="text-sm font-medium text-[#b18466]">Thank You</p>
        <h1 className="mt-4 text-3xl font-light tracking-normal text-[#332821]">
          감사의 마음을 전합니다
        </h1>
        <div className="mx-auto mt-7 h-px w-12 bg-[#dcc5ad]" />
      </header>

      <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-md bg-[#f3e8da]">
        {invitation.image_url ? (
          <Image
            src={invitation.image_url}
            alt={`${invitation.groom_name}, ${invitation.bride_name} 감사장 메인 이미지`}
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            className="object-cover"
            priority
          />
        ) : (
          <div
            aria-label="감사장 대표 이미지 영역"
            className="flex h-full w-full items-center justify-center"
          >
            <div className="h-20 w-px bg-[#d6c4ad]" />
          </div>
        )}
      </div>

      <section className="px-1 py-12">
        <p className="whitespace-pre-line text-base leading-9 text-[#5f5147]">
          {invitation.message}
        </p>
      </section>

      <section className="border-t border-[#eadfce] px-1 py-10">
        <p className="text-xs font-medium text-[#a17f63]">신랑 · 신부</p>
        <p className="mt-5 text-2xl font-semibold tracking-normal text-[#332821]">
          {invitation.groom_name}
          <span className="mx-3 text-lg font-light text-[#a17f63]">&</span>
          {invitation.bride_name}
        </p>
      </section>
    </article>
  );
}
