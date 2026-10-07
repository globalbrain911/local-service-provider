function ApprovedIcon({ size = 28 }) {
  return (
    <svg viewBox="0 0 52 52" width={size} height={size} fill="none">
      <circle
        cx="26"
        cy="26"
        r="24"
        stroke="#16a34a"
        strokeWidth="3"
        strokeDasharray="151"
        strokeDashoffset="151"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="151"
          to="0"
          dur="0.6s"
          fill="freeze"
        />
      </circle>
      <path
        d="M14 27 l8 8 l16 -17"
        stroke="#16a34a"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        strokeDashoffset="40"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="40"
          to="0"
          dur="0.4s"
          begin="0.5s"
          fill="freeze"
        />
      </path>
    </svg>
  );
}

function PendingIcon({ size = 28 }) {
  return (
    <svg
      viewBox="0 0 52 52"
      width={size}
      height={size}
      fill="none"
      stroke="#d97706"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <circle cx="26" cy="26" r="24" strokeWidth="3" />
      <line x1="26" y1="26" x2="36" y2="26" />
      <line x1="26" y1="26" x2="26" y2="13">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 26 26"
          to="360 26 26"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}

function RejectedIcon({ size = 28 }) {
  return (
    <svg viewBox="0 0 52 52" width={size} height={size} fill="none">
      <circle
        cx="26"
        cy="26"
        r="24"
        stroke="#dc2626"
        strokeWidth="3"
        strokeDasharray="151"
        strokeDashoffset="151"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="151"
          to="0"
          dur="0.6s"
          fill="freeze"
        />
      </circle>
      <g
        stroke="#dc2626"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="30"
        strokeDashoffset="30"
      >
        <line x1="17" y1="17" x2="35" y2="35">
          <animate
            attributeName="stroke-dashoffset"
            from="30"
            to="0"
            dur="0.3s"
            begin="0.5s"
            fill="freeze"
          />
        </line>
        <line x1="35" y1="17" x2="17" y2="35">
          <animate
            attributeName="stroke-dashoffset"
            from="30"
            to="0"
            dur="0.3s"
            begin="0.7s"
            fill="freeze"
          />
        </line>
      </g>
    </svg>
  );
}

const config = {
  approved: {
    Icon: ApprovedIcon,
    label: "Approved",
    style: "text-green-700",
  },
  pending: {
    Icon: PendingIcon,
    label: "Pending",
    style: " text-amber-700",
  },
  rejected: {
    Icon: RejectedIcon,
    label: "Rejected",
    style: "bg-red-50 text-red-700",
  },
};

export function StatusBadge({ status }) {
  const { Icon, label, style } = config[status] ?? config.approved;
  return (
    <span
      className={` inline-flex items-center gap-2 rounded-full mt-3  sm:p-0 text-sm sm:text-lg font-medium ${style}`}
    >
      <Icon size={26} />
      {label}
    </span>
  );
}
