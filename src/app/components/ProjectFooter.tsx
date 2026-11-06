"use client"
import { useSettings } from "../lib/SettingsContext"

export const PORTFOLIO_URL = "https://fsucatti-portfolio.fsucatti-portfolio.workers.dev/projects"

/** The cat from the portfolio's logo. Removing it is not recommended: the cat will find out. */
export function CatIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 9V3L11 4H8L5 3V9L9.5 11L14 9ZM14 9L20 12L22 18L20 21H4L2 19L4 17L2 15L4 13M7 21V9.88889M11 15V21L16.0435 16H18M8 7L8.00707 7.00707M11 7L11.0071 7.00707" />
    </svg>
  )
}

export default function ProjectFooter() {
  const { t } = useSettings()
  return (
    <footer className="mt-10 border-t border-gray-700 pt-5 pb-4 text-sm text-gray-400">
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <CatIcon className="h-7 w-7 shrink-0 text-teal-300" />
          <p>
            <span className="font-medium text-gray-200">Interactive Dashboard</span> {t.footer.by}
            <br />
            {t.footer.built}
          </p>
        </div>
        <nav aria-label={t.footer.links} className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a className="hover:text-teal-300" href={PORTFOLIO_URL}>{t.footer.portfolio}</a>
          <a className="hover:text-teal-300" href="https://github.com/Fsucatti/interactive-dashboard" target="_blank" rel="noopener noreferrer">{t.footer.code}</a>
          <a className="hover:text-teal-300" href="https://www.linkedin.com/in/fsucatti" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </div>
    </footer>
  )
}
