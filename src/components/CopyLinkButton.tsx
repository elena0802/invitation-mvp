"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type CopyLinkButtonProps = {
  children?: ReactNode;
};

export function CopyLinkButton({ children }: CopyLinkButtonProps) {
  const [message, setMessage] = useState("");

  async function handleCopy() {
    if (!navigator.clipboard) {
      setMessage("브라우저에서 클립보드를 지원하지 않습니다");
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("링크가 복사되었습니다");
    } catch {
      setMessage("링크를 복사하지 못했습니다");
    }
  }

  return (
    <div className="border-t border-[#eadfce] px-1 pt-8">
      {children ? <div className="mb-3">{children}</div> : null}
      <button
        type="button"
        onClick={handleCopy}
        className="min-h-12 w-full rounded-md bg-[#3f342c] px-5 text-base font-semibold text-white transition hover:bg-[#5a4a3f] focus:outline-none focus:ring-2 focus:ring-[#a17f63] focus:ring-offset-2 focus:ring-offset-[#fffaf3]"
      >
        링크 복사하기
      </button>
      {message ? (
        <p className="mt-3 text-center text-sm font-medium text-[#8a6f55]">
          {message}
        </p>
      ) : null}
    </div>
  );
}
