import { useState } from "react";
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";

export default function App() {
  const { data: session, isPending, error, refetch } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSignUp(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { data, error: err } = await signUp.email({
        name,
        email,
        password,
      });
      void data;
      if (err) setMessage(err.message || "Sign up failed");
      else setMessage("Signed up successfully");
      refetch();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Sign up error";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { data, error: err } = await signIn.email({
        email,
        password,
        rememberMe: true,
      });
      void data;
      if (err) setMessage(err.message || "Sign in failed");
      else setMessage("Signed in successfully");
      refetch();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Sign in error";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setLoading(true);
    setMessage(null);
    try {
      await signOut();
      setMessage("Signed out");
      refetch();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Sign out error";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", padding: 16 }}>
      <h2>Better Auth Demo</h2>
      {isPending ? (
        <p>Loading session…</p>
      ) : session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <button onClick={handleSignOut} disabled={loading}>
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSignIn} style={{ display: "grid", gap: 8 }}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              Sign in
            </button>
          </form>

          <hr style={{ margin: "1rem 0" }} />

          <form onSubmit={handleSignUp} style={{ display: "grid", gap: 8 }}>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              Sign up
            </button>
          </form>
        </div>
      )}

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
}
