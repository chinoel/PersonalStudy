"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      window.location.href = "/auth/login";
    },
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (status == "loading") {
    return null;
  }

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const result = await signIn("user", {
      redirect: false,
      username,
      password,
    });
    if (result?.error) {
      console.error("로그인 실패", result.error);
    }
  }

  return (
    <div>
      <h1>Home</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>

      <button
        color="primary"
        onClick={() => signIn("kakao")}
      >
        카카오 로그인
      </button>



      {session ? (
        <div>로그인 된 사용자

          <div>사용자 정보</div>
          <div>id: {session.user.email}</div>
          <div>name: {session.user.name}</div>
          <button color="primary" onClick={() => signOut()}>
            로그아웃
          </button>
        </div>
      ) : (
        <div>아님</div>
      )}
    </div>
  );
}
