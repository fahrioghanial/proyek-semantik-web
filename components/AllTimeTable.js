import Image from "next/image";

export default function AllTimeTable(props) {
  const content = props.allTimeTable.map((result) => (
    <div
      className={`flex ${
        result.rank == 11 ? "border-b-2 border-black rounded-b-xl" : ""
      } ${result.rank % 2 == 0 ? "bg-slate-100" : ""} md:text-xl`}
      key={result.id}
    >
      <div
        className={`w-1/12 p-2 border-x-2 border-black ${
          result.rank == 11 ? "rounded-bl-xl" : ""
        }`}
      >
        {result.rank}
      </div>
      <div className="w-1/3 p-2 border-r-2 border-black flex items-center gap-2">
        <img
          src={`/img/bendera/${result.country_name}.png`}
          title={result.country_name}
          className="w-10"
        />
        {result.country_name}
      </div>
      <div className="w-1/6 p-2 border-r-2 border-black">{result.gold}</div>
      <div className="w-1/6 p-2 border-r-2 border-black">{result.silver}</div>
      <div className="w-1/6 p-2 border-r-2 border-black">{result.bronze}</div>
      <div
        className={`w-1/6 p-2 border-r-2 border-black ${
          result.rank == 11 ? "rounded-br-xl" : ""
        }`}
      >
        {result.total_medal}
      </div>
    </div>
  ));

  function renderElement() {
    if (content.length === 0) {
      return (
        <div>
          <h1 className="text-3xl font-bold mt-10 mb-20">Data not found!</h1>
        </div>
      );
    } else {
      return <>{content}</>;
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold mt-10 mb-10">All-time Medal Table</h1>
      <div className="flex border-y-2 border-black rounded-t-xl md:text-xl font-bold bg-slate-100">
        <div className="w-1/12 p-2 border-x-2 rounded-tl-xl border-black">
          Rank
        </div>
        <div className="w-1/3 p-2 border-r-2 border-black">Country</div>
        <div className="w-1/6 p-2 border-r-2 border-black">Gold</div>
        <div className="w-1/6 p-2 border-r-2 border-black">Silver</div>
        <div className="w-1/6 p-2 border-r-2 border-black">Bronze</div>
        <div className="w-1/6 p-2 border-r-2 rounded-tr-xl border-black">
          Total Medal
        </div>
      </div>
      {renderElement()}
    </>
  );
}
