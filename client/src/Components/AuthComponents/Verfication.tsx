export default function Verification() {
  return (
    <section className="bg-slate-50 h-screen flex justify-center items-center">
      <div className="md:w-1/3 bg-white border-1 rounded-lg flex justify-center flex-col p-5">
        <h2 className="text-2xl font-semibold mb-4">
          Check Your Email for Verification Link
        </h2>
        <p className="text-gray-600">
          We have sent a verification Link to your email address. Please check
          your inbox
        </p>
      </div>
    </section>
  );
}
