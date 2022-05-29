import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import AllTimeTable from "../components/AllTimeTable";

export default function Home() {
  const [results, setResults] = useState([""]);
  const [allTimeTable, setAllTimeTable] = useState([""]);
  const [input, setInput] = useState("");
  const [showAllTimeTable, setShowAllTimeTable] = useState(false);

  const BASE_URL = "http://localhost:3030/seagames/query";

  const headers = {
    Accept: "application/sparql-results+json,*/*;q=0.9",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };

  const handleChange = (newValue) => {
    setInput(newValue);
  };

  const formatter = (code, index) => {
    return {
      // Table Field
      id: index,
      games: code.games.value,
      year: code.year.value,
      host_cities: code.host_cities.value,
      host_country: code.host_country.value,
      opened_by: code.opened_by.value,
      date: code.date.value,
      sports: code.sports.value,
      events: code.events.value,
      nations: code.nations.value,
      competitors: code.competitors.value,
      winner: code.winner.value,
      runner_up: code.runner_up.value,
      third_place: code.third_place.value,
    };
  };

  const allTimeTableFormatter = (code, index) => {
    return {
      // Table Field
      id: index,
      rank: code.rank.value,
      country_name: code.country_name.value,
      gold: code.gold.value,
      silver: code.silver.value,
      bronze: code.bronze.value,
      total_medal: code.total_medal.value,
      debuted: code.debuted.value,
    };
  };

  function queryDataForEachField(field) {
    return `PREFIX : <http://www.semanticweb.org/acer/ontologies/2022/4/untitled-ontology-9#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?games ?year ?host_cities ?host_country ?opened_by ?date ?sports ?events ?nations ?competitors ?winner ?runner_up ?third_place
    {
      ?id a :Edition ;
          :games ?games ;
          :year ?year ;
          :host_cities ?hcity ;
          :host_country ?hcountry ;
          :opened_by ?opened_by ;
          :date ?date ;
          :sports ?sports ;
          :events ?events ;
          :nations ?nations ;
          :competitors ?competitors ;
          :winner ?w ;
          :runner_up ?r ;
          :third_place ?t .
      ?hcity :city_name ?host_cities .
      ?hcountry :country_name ?host_country .
      ?w :country_name ?winner .
      ?r :country_name ?runner_up .
      ?t :country_name ?third_place .   
      FILTER (
        regex(?${field}, "${input}", "i")  
        )
    } ORDER BY ?games`;
  }

  // Query
  const getAllTimeTable = async () => {
    const queryData = {
      query: `PREFIX : <http://www.semanticweb.org/acer/ontologies/2022/4/untitled-ontology-9#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      SELECT ?rank ?country_name ?gold ?silver ?bronze ?total_medal ?debuted
      {
        ?id a :Country ;
          :country_name ?country_name ;
            :rank ?rank ;
            :gold ?gold ;
            :silver ?silver ;
            :bronze ?bronze ;
            :total_medal ?total_medal ;
            :debuted ?debuted .
      } ORDER BY ?rank`,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        allTimeTableFormatter(code, index)
      );
      console.log(formatted_data);

      setAllTimeTable(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllData = async () => {
    setShowAllTimeTable(false);
    const queryData = {
      query: `PREFIX : <http://www.semanticweb.org/acer/ontologies/2022/4/untitled-ontology-9#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      SELECT ?games ?year ?host_cities ?host_country ?opened_by ?date ?sports ?events ?nations ?competitors ?winner ?runner_up ?third_place
      {
        ?id a :Edition ;
            :games ?games ;
            :year ?year ;
            :host_cities ?hcity ;
            :host_country ?hcountry ;
            :opened_by ?opened_by ;
            :date ?date ;
            :sports ?sports ;
            :events ?events ;
            :nations ?nations ;
            :competitors ?competitors ;
            :winner ?w ;
            :runner_up ?r ;
            :third_place ?t .
        ?hcity :city_name ?host_cities .
        ?hcountry :country_name ?host_country .
        ?w :country_name ?winner .
        ?r :country_name ?runner_up .
        ?t :country_name ?third_place .
      } ORDER BY ?games`,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getData = async () => {
    setShowAllTimeTable(false);
    const queryData = {
      query: `PREFIX : <http://www.semanticweb.org/acer/ontologies/2022/4/untitled-ontology-9#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      SELECT ?games ?year ?host_cities ?host_country ?opened_by ?date ?sports ?events ?nations ?competitors ?winner ?runner_up ?third_place
      {
        ?id a :Edition ;
            :games ?games ;
            :year ?year ;
            :host_cities ?hcity ;
            :host_country ?hcountry ;
            :opened_by ?opened_by ;
            :date ?date ;
            :sports ?sports ;
            :events ?events ;
            :nations ?nations ;
            :competitors ?competitors ;
            :winner ?w ;
            :runner_up ?r ;
            :third_place ?t .
        ?hcity :city_name ?host_cities .
        ?hcountry :country_name ?host_country .
        ?w :country_name ?winner .
        ?r :country_name ?runner_up .
        ?t :country_name ?third_place .   
        FILTER (
          regex(?year, "${input}", "i") ||
          regex(?host_cities, "${input}", "i") ||
          regex(?host_country, "${input}", "i") ||
          regex(?opened_by, "${input}", "i") ||
          regex(?date, "${input}", "i") ||
          regex(?sports, "${input}", "i") ||
          regex(?events, "${input}", "i") ||
          regex(?nations, "${input}", "i") ||
          regex(?competitors, "${input}", "i") ||
          regex(?winner, "${input}", "i") ||
          regex(?runner_up, "${input}", "i") ||
          regex(?third_place, "${input}", "i")
          )
      } ORDER BY ?games`,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getYear = async () => {
    setShowAllTimeTable(false);
    const queryData = { query: queryDataForEachField("year") };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getHostCities = async () => {
    setShowAllTimeTable(false);
    const queryData = { query: queryDataForEachField("host_cities") };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getHostCountry = async () => {
    setShowAllTimeTable(false);
    const queryData = { query: queryDataForEachField("host_country") };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getOpenedBy = async () => {
    setShowAllTimeTable(false);
    const queryData = { query: queryDataForEachField("opened_by") };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getDate = async () => {
    setShowAllTimeTable(false);
    const queryData = { query: queryDataForEachField("date") };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getWinner = async () => {
    setShowAllTimeTable(false);
    const queryData = { query: queryDataForEachField("winner") };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getRunnerUp = async () => {
    setShowAllTimeTable(false);
    const queryData = { query: queryDataForEachField("runner_up") };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  const getThirdPlace = async () => {
    setShowAllTimeTable(false);
    const queryData = { query: queryDataForEachField("third_place") };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Extract Data from data.results.bindings
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setResults(formatted_data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllData();
    getAllTimeTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allTimeTableHandler = async () => {
    setShowAllTimeTable(true);
  };

  const participants = allTimeTable.map((result) => (
    <div className="flex gap-3" key={result.id}>
      <img
        src={`/img/bendera/${result.country_name}.png`}
        title={result.country_name}
        className="w-10"
      />
      <h1>{result.country_name}</h1>
      <h1>(Debuted: {result.debuted})</h1>
    </div>
  ));

  function renderElement() {
    if (participants.length === 0) {
      return (
        <div>
          <h1 className="text-3xl font-bold mt-10 mb-20">Data not found!</h1>
        </div>
      );
    } else {
      return <>{participants}</>;
    }
  }

  return (
    <>
      <div className="bg-[url('/bgmobile.jpg')] md:bg-[url('/bg.jpg')] bg-cover bg-no-repeat bg-top">
        <div className="container m-auto px-10 pt-10 pb-16">
          <div className="items-center justify-center text-center">
            <img
              src="/img/logoseagames.png"
              alt="Sea Games"
              title="Sea Games"
              className="w-40 mx-auto"
            />
            <h1 className="md:text-6xl text-2xl font-bold mt-5 text-white">
              Southeast Asian Games
            </h1>
          </div>
          <div className="md:flex mt-10 bg-white rounded-xl">
            <div className="text-sm md:text-base md:w-1/2 font-bold md:border-r-2 border-black  p-5">
              <div>
                The Southeast Asian Games, also known as the SEA Games, is a
                biennial multi-sport event involving participants from the
                current 11 countries of Southeast Asia. The games are under the
                regulation of the Southeast Asian Games Federation with
                supervision by the International Olympic Committee (IOC) and the
                Olympic Council of Asia (OCA).
              </div>
              <div className="mt-5 mb-2">Participating Nations</div>
              <div className="flex flex-col gap-3">{renderElement()}</div>
            </div>
            {/* Search Part */}
            <div className="md:w-1/2 mt-5 md:mt-0 p-5 flex flex-col gap-5">
              <div>
                <h1 className="text-xl font-semibold">
                  Search by Year, City, Country, and Other Field
                </h1>
                <SearchBar
                  value={input}
                  onChange={handleChange}
                  onClick={getData}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <h1 className="font-semibold">Search by Year</h1>
                  <SearchBar
                    value={input}
                    onChange={handleChange}
                    onClick={getYear}
                  />
                </div>
                <div className="w-full">
                  <h1 className="font-semibold">Search by Host Cities</h1>
                  <SearchBar
                    value={input}
                    onChange={handleChange}
                    onClick={getHostCities}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <h1 className="font-semibold">Search by Host Country</h1>
                  <SearchBar
                    value={input}
                    onChange={handleChange}
                    onClick={getHostCountry}
                  />
                </div>
                <div className="w-full">
                  <h1 className="font-semibold">Search by Opened By</h1>
                  <SearchBar
                    value={input}
                    onChange={handleChange}
                    onClick={getOpenedBy}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <h1 className="font-semibold">Search by Date</h1>
                  <SearchBar
                    value={input}
                    onChange={handleChange}
                    onClick={getDate}
                  />
                </div>
                <div className="w-full">
                  <h1 className="font-semibold">Search by Runner Up</h1>
                  <SearchBar
                    value={input}
                    onChange={handleChange}
                    onClick={getRunnerUp}
                  />
                </div>
                <div className="w-full">
                  <h1 className="font-semibold">Search by Third Place</h1>
                  <SearchBar
                    value={input}
                    onChange={handleChange}
                    onClick={getThirdPlace}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Search by Winner</h1>
                <SearchBar
                  value={input}
                  onChange={handleChange}
                  onClick={getWinner}
                />
              </div>
              <button
                onClick={allTimeTableHandler}
                className="py-2 px-3 text-xl text-white bg-blue-700 rounded-xl hover:bg-blue-900 font-bold"
              >
                Show All-time Table
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-1 border-black"></hr>

      <div
        className={`container mx-auto p-5 ${
          showAllTimeTable ? "visible" : "hidden"
        }`}
      >
        <AllTimeTable allTimeTable={allTimeTable} />
      </div>

      <div
        className={`container m-auto px-10 ${
          showAllTimeTable ? "hidden" : "visible"
        }`}
      >
        <ResultCard results={results} />
      </div>

      <footer>
        <div className="border-t-2 border-black mt-10 p-8 text-center">
          Mohamad Fahrio Ghanial Fatihah - 140810190005
        </div>
      </footer>
    </>
  );
}
