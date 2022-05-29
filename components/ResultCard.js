import Image from "next/image";

export default function ResultCard(props) {
  const content = props.results.map((result) => (
    <div
      className="max-w-sm w-full lg:max-w-full lg:flex mb-20 mt-10 rounded-lg shadow-lg bg-slate-100"
      key={result.id}
    >
      <div
        className="md:w-1/5 self-center bg-contain bg-center bg-no-repeat rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden p-2"
        title={`Sea Games ${result.games}`}
      >
        <img
          src={`/img/logoedisi/seagames${result.games}.png`}
          title={`Sea Games ${result.games}`}
          alt={result.winner}
          className="m-auto"
        />
      </div>
      <div className=" rounded-b lg:rounded-b-none lg:rounded-r p-4 md:flex justify-between w-full md:border-l-2">
        <div className="mb-8">
          <p className="text-xl font-semibold">
            Sea Games {result.games} ({result.year})
          </p>
          <p className="text-sm font-semibold">{result.date}</p>
          <div className="font-bold text-xl flex gap-2 my-3">
            <div className="my-auto">
              <Image
                src={`/img/bendera/${result.host_country}.png`}
                title={result.host_country}
                alt={result.host_country}
                width={40}
                height={24}
              />
            </div>
            {result.host_cities}, {result.host_country}
          </div>
          <p className="font-semibold">Opened by {result.opened_by}</p>
          <p className="mt-5">Sports: {result.sports}</p>
          <p className="">Events: {result.events}</p>
          <p className="">Nations: {result.nations}</p>
          <p className="">Competitors: {result.competitors}</p>
        </div>
        <div className="flex gap-5">
          <div>
            <h1 className="text-sm md:text-xl font-bold text-center my-2">
              Winner
            </h1>
            <Image
              src={`/img/bendera/${result.winner}.png`}
              title={result.winner}
              alt={result.winner}
              width={205}
              height={123}
            />
            <h1 className="text-sm md:text-xl font-bold text-center my-2">
              {result.winner}
            </h1>
          </div>
          <div>
            <h1 className="text-sm md:text-xl font-bold text-center my-2">
              Runner Up
            </h1>
            <Image
              src={`/img/bendera/${result.runner_up}.png`}
              title={result.runner_up}
              alt={result.runner_up}
              width={205}
              height={123}
            />
            <h1 className="text-sm md:text-xl font-bold text-center my-2">
              {result.runner_up}
            </h1>
          </div>
          <div>
            <h1 className="text-sm md:text-xl font-bold text-center my-2">
              Third Place
            </h1>
            <Image
              src={`/img/bendera/${result.third_place}.png`}
              title={result.third_place}
              alt={result.third_place}
              width={205}
              height={123}
            />
            <h1 className="text-sm md:text-xl font-bold text-center my-2">
              {result.third_place}
            </h1>
          </div>
        </div>
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
      <h1 className="text-3xl font-bold mt-10">
        {content.length} Results Found
      </h1>
      {renderElement()}
    </>
  );
}
