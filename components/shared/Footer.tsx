export default function Footer() {
  return (
    <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
      <p>
        © {new Date().getFullYear()} Project Review Dashboard. All rights
        reserved.
      </p>
    </footer>
  );
}
