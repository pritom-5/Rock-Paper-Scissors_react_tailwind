export default function Rules({ showRulesHandler }) {
  return (
    <div id="section" className="">
      <div
        id="overlay"
        onClick={() => showRulesHandler()}
        className="absolute top-0 left-0 z-0 min-h-screen min-w-full bg-black bg-opacity-60"
      ></div>
      <div
        id="modal"
        className="absolute z-10 p-16 left-1/2 -translate-x-1/2 top-1/4 bg-slate-50 rounded-xl"
      >
        <div id="rules-img" className="h-64 aspect-square">
          <img
            src="/images/image-rules.svg"
            alt="rules"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
