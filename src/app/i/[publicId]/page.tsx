import Link from "next/link";

type InvitationPageProps = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function PublicInvitationPage({
  params,
}: InvitationPageProps) {
  const { publicId } = await params;

  return (
    <main className="min-h-screen bg-[#f8f5f0] px-6 py-10 text-[#2f2a25]">
      <section className="mx-auto w-full max-w-md rounded-md bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-[#8a6f55]">공개 초대장 URL</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-normal">
          /i/{publicId}
        </h1>
        <p className="mt-4 leading-7 text-[#6d6258]">
          다음 단계에서 Supabase에 저장된 초대장 데이터를 이 화면에
          표시합니다.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md border border-[#d8cfc5] px-4 text-sm font-semibold text-[#2f2a25]"
        >
          홈으로
        </Link>
      </section>
    </main>
  );
}
