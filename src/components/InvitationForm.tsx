"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function InvitationForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/invitations", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        publicUrl?: string;
        message?: string;
      };

      if (!response.ok || !result.publicUrl) {
        throw new Error(result.message ?? "초대장을 저장하지 못했습니다.");
      }

      router.push(result.publicUrl);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "초대장을 저장하는 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <fieldset>
        <legend className="block text-sm font-semibold">종류 선택</legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <label className="flex min-h-12 items-center justify-center rounded-md border border-[#d8cfc5] px-4 text-sm font-semibold text-[#2f2a25] has-checked:border-[#2f2a25] has-checked:bg-[#2f2a25] has-checked:text-white">
            <input
              type="radio"
              name="card_type"
              value="invitation"
              defaultChecked
              className="sr-only"
            />
            초대장
          </label>
          <label className="flex min-h-12 items-center justify-center rounded-md border border-[#d8cfc5] px-4 text-sm font-semibold text-[#2f2a25] has-checked:border-[#2f2a25] has-checked:bg-[#2f2a25] has-checked:text-white">
            <input
              type="radio"
              name="card_type"
              value="thank_you"
              className="sr-only"
            />
            감사장
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="title" className="block text-sm font-semibold">
          초대장 제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="우리 결혼합니다"
          className="mt-2 min-h-12 w-full rounded-md border border-[#d8cfc5] px-4 text-base outline-none transition focus:border-[#8a6f55] focus:ring-2 focus:ring-[#eaded1]"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="groom_name" className="block text-sm font-semibold">
            신랑 이름
          </label>
          <input
            id="groom_name"
            name="groom_name"
            type="text"
            required
            placeholder="홍길동"
            className="mt-2 min-h-12 w-full rounded-md border border-[#d8cfc5] px-4 text-base outline-none transition focus:border-[#8a6f55] focus:ring-2 focus:ring-[#eaded1]"
          />
        </div>

        <div>
          <label htmlFor="bride_name" className="block text-sm font-semibold">
            신부 이름
          </label>
          <input
            id="bride_name"
            name="bride_name"
            type="text"
            required
            placeholder="김영희"
            className="mt-2 min-h-12 w-full rounded-md border border-[#d8cfc5] px-4 text-base outline-none transition focus:border-[#8a6f55] focus:ring-2 focus:ring-[#eaded1]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="wedding_date" className="block text-sm font-semibold">
          예식일
        </label>
        <input
          id="wedding_date"
          name="wedding_date"
          type="date"
          required
          className="mt-2 min-h-12 w-full rounded-md border border-[#d8cfc5] px-4 text-base outline-none transition focus:border-[#8a6f55] focus:ring-2 focus:ring-[#eaded1]"
        />
      </div>

      <div>
        <label htmlFor="venue" className="block text-sm font-semibold">
          예식 장소
        </label>
        <input
          id="venue"
          name="venue"
          type="text"
          required
          placeholder="서울 웨딩홀 3층 그랜드볼룸"
          className="mt-2 min-h-12 w-full rounded-md border border-[#d8cfc5] px-4 text-base outline-none transition focus:border-[#8a6f55] focus:ring-2 focus:ring-[#eaded1]"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-semibold">
          메인 이미지
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="mt-2 block w-full rounded-md border border-[#d8cfc5] px-4 py-3 text-sm text-[#6d6258] file:mr-4 file:rounded-md file:border-0 file:bg-[#2f2a25] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
        <p className="mt-2 text-sm leading-6 text-[#8a7c70]">
          JPG, PNG, WebP 형식의 5MB 이하 이미지를 업로드할 수 있습니다.
        </p>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold">
          초대 문구
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="소중한 분들을 모시고 결혼식을 올리고자 합니다."
          className="mt-2 w-full resize-y rounded-md border border-[#d8cfc5] px-4 py-3 text-base leading-7 outline-none transition focus:border-[#8a6f55] focus:ring-2 focus:ring-[#eaded1]"
        />
      </div>

      {errorMessage ? (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#2f2a25] px-6 text-base font-semibold text-white transition hover:bg-[#4a4037] disabled:cursor-not-allowed disabled:bg-[#9b9187]"
      >
        {isSubmitting ? "저장 중..." : "저장하고 공개 URL 보기"}
      </button>
    </form>
  );
}
