export default function PageNotFound() {
  return (
    <div className="h-screen px-8 flex flex-col gap-6 justify-center items-center">
      <p className="text-4xl text-blue-700 font-bold tracking-widest">404 <small className="text-black">Oops!</small></p>
      <p className="text-xl text-gray-700 text-center">The page you are looking for does not exist.</p>
    </div>
  );
}
