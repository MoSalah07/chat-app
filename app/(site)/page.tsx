import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <section className="w-full h-screen">
      <div className="container mx-auto px-16 flex flex-col items-center justify-center w-full h-full">
        <div className="capitalize mb-4">
          <h2 className="font-bold text-3xl tracking-tight text-gray-900">
            sign in to your account
          </h2>
        </div>
        <AuthForm />
      </div>
    </section>
  );
}
