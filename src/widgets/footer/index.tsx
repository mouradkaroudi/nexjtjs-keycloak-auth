export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-whitedark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="#" className="hover:underline">
            Nextjs/ with keycloak™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
