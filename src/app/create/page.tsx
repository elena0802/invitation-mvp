import Link from "next/link";

export default function CreateInvitationPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-[#2f2a25]">
      <section className="mx-auto w-full max-w-2xl">
        <Link href="/" className="text-sm font-medium text-[#8a6f55]">
          홈으로
        </Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-normal">
          초대장 생성 페이지
        </h1>
        <p className="mt-4 leading-7 text-[#6d6258]">
          다음 단계에서 입력 폼과 Supabase 저장 기능을 추가합니다.
        </p>
      </section>
    </main>
  );
}
