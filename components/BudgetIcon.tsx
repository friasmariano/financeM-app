'use client';

import { BudgetIconProps } from "@/types/BudgetIconProps";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";

export default function BudgetIcon({ title, onClick }: BudgetIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isDark = useAppSelector((state) => state.theme.data.isDark);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0px",
      cursor: 'pointer'
    }}>
      <div onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
           onClick={onClick}
           onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.()
            }
           }}
           role="button"
           tabIndex={0}
           aria-label={title}
           style={{position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: 'transform 0.3s ease',
                    transform: isHovered ? 'scale(1.09)' : 'scale(1)'}}>

        {/* Folder Icon */}
        <svg
          width="88"
          height="88"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isHovered ? '1': '0.7',
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            filter: "drop-shadow(0px 3px 8px rgba(0,0,0,0.2))"
          }}
          role="img"
          aria-label="Folder icon"
        >
          <defs>
            <linearGradient id="folderGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              {isDark ? (
                <>
                  <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="rgba(11, 39, 48, 1)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="rgba(54, 147, 179, 1)" />
                </>
              )}
            </linearGradient>
            <filter id="folderShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0, 0, 0, 1)" />
            </filter>
          </defs>

          <path
            fill="url(#folderGradient)"
            d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"
          />
        </svg>

        {/* Pie Chart Overlay */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            transform: "translate(0px, 2px)",
            opacity: isHovered ? '1' : '0.8',
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"
          }}
          role="img"
          aria-label="Pie chart icon"
        >
          <defs>
            <linearGradient id="pieChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              {isDark ? (
                <>
                  <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#0B2730" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#3693B3" />
                </>
              )}
            </linearGradient>
          </defs>
          <path
            fill="url(#pieChartGradient)"
            d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793zm1 0V7.5h6.482A7 7 0 0 0 8.5 1.018M14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"
          />
        </svg>
      </div>

      <p style={{ margin: '17px 0px 0px 0px',
                  transform: "translate(0px, -10px)" }}>{title}</p>
    </div>
  );
}
