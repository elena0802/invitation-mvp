import { CopyLinkButton } from "@/components/CopyLinkButton";
import { KakaoShareButton } from "@/components/KakaoShareButton";
import type { InvitationRecord } from "@/types/invitation";
import Image from "next/image";

type BloomThankYouTemplateProps = {
  invitation: InvitationRecord;
};

export function BloomThankYouTemplate({
  invitation,
}: BloomThankYouTemplateProps) {
  return (
    <article className="mx-auto min-h-screen w-full max-w-[430px] bg-[#fffaf6] px-6 py-8 text-center text-[#3c3028] sm:my-8 sm:min-h-0 sm:px-8 sm:py-10">
      <header className="pb-8">
        <p className="text-sm font-medium text-[#b18466]">Thank You</p>
        <h1 className="mt-4 text-3xl font-light tracking-normal text-[#332821]">
          감사의 마음을 전합니다
        </h1>
        <div className="mx-auto mt-7 h-px w-12 bg-[#dcc5ad]" />
      </header>

      <div className="relative mx-auto aspect-[6/7] w-full overflow-hidden rounded-md bg-[#f3e8da]">
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

      <section className="px-1 py-10">
        <p className="whitespace-pre-line text-base leading-8 text-[#5f5147]">
          {invitation.message}
        </p>
      </section>

      <section className="border-t border-[#eadfce] px-1 py-7">
        <p className="text-xs font-medium text-[#a17f63]">신랑 · 신부</p>
        <p className="mt-5 text-2xl font-semibold tracking-normal text-[#332821]">
          {invitation.groom_name}
          <span className="mx-3 text-lg font-light text-[#a17f63]">&</span>
          {invitation.bride_name}
        </p>
      </section>

      <CopyLinkButton>
        <KakaoShareButton
          cardType={invitation.card_type}
          publicId={invitation.public_id}
          imageUrl={invitation.image_url}
        />
      </CopyLinkButton>
    </article>
  );
}
