import { InvitationForm } from "@/components/InvitationForm";
import Link from "next/link";

export default function CreateInvitationPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-[#2f2a25]">
      <section className="mx-auto w-full max-w-2xl">
        <Link href="/" className="text-sm font-medium text-[#8a6f55]">
          홈으로
        </Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-normal">
          초대장 만들기
        </h1>
        <p className="mt-4 leading-7 text-[#6d6258]">
          필요한 정보를 입력한 뒤 저장하면 공개 초대장 URL로 이동합니다.
        </p>
        <InvitationForm />
      </section>
    </main>
  );
}
