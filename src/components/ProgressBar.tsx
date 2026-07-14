interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "12px",
        background: "#ddd",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "8px",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          background: "#4f46e5",
          transition: "0.4s",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;