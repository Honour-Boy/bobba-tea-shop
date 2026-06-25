const Alert = ({ msg, setMsg, onDismiss }) => {
  if (!msg.show) return null;

  const dismiss = () => {
    setMsg((prev) => ({ ...prev, show: false }));
    if (onDismiss) onDismiss();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white-100 p-7 text-center shadow-2xl">
        <h1 className="text-2xl font-semibold">Message</h1>
        <p className="text-[#5b5b5b]">{msg.value}</p>
        <button
          onClick={dismiss}
          className="rounded-lg bg-tertiary px-8 py-2 font-semibold text-white transition hover:opacity-90"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Alert;
