import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";

export default function Home() {
  const [value, setValue] = useState({
    codes: [""],
    games: "",
    year: "",
    host_cities: "",
    host_country: "",
    opened_by: "",
    date: "",
    sports: "",
    events: "",
    nations: "",
    competitors: "",
    winner: "",
    runner_up: "",
    third_place: "",
  });

  const formatter = (codes, index) => {
    return {
      id: index,
      games: codes.games.value,
      year: codes.year.value,
      host_cities: codes.host_cities.value,
      host_country: codes.host_country.value,
      opened_by: codes.opened_by.value,
      date: codes.date.value,
      sports: codes.sports.value,
      events: codes.events.value,
      nations: codes.nations.value,
      competitors: codes.competitors.value,
      winner: codes.winner.value,
      runner_up: codes.runner_up.value,
      third_place: codes.third_place.value,
    };
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      input: event.target.value,
    });
  };

  const getAllData = async () => {
    const BASE_URL = "http://localhost:3030/seagames/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

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

      // Convert Data
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getData = async () => {
    const BASE_URL = "http://localhost:3030/seagames/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

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
          regex(?year, "${value.input}", "i") ||
          regex(?host_cities, "${value.input}", "i") ||
          regex(?host_country, "${value.input}", "i") ||
          regex(?opened_by, "${value.input}", "i") ||
          regex(?date, "${value.input}", "i") ||
          regex(?sports, "${value.input}", "i") ||
          regex(?events, "${value.input}", "i") ||
          regex(?nations, "${value.input}", "i") ||
          regex(?competitors, "${value.input}", "i") ||
          regex(?winner, "${value.input}", "i") ||
          regex(?runner_up, "${value.input}", "i") ||
          regex(?third_place, "${value.input}", "i")
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

      // Convert Data
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const content = value.codes.map((code) => (
    <tr
      className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
      key={code.id}
    >
      <td className="px-6 py-4">{code.games}</td>
      <td className="px-6 py-4">{code.year}</td>
      <td className="px-6 py-4">{code.host_cities}</td>
      <td className="px-6 py-4">{code.host_country}</td>
      <td className="px-6 py-4">{code.opened_by}</td>
      <td className="px-6 py-4">{code.date}</td>
      <td className="px-6 py-4">{code.sports}</td>
      <td className="px-6 py-4">{code.events}</td>
      <td className="px-6 py-4">{code.nations}</td>
      <td className="px-6 py-4">{code.competitors}</td>
      <td className="px-6 py-4">{code.winner}</td>
      <td className="px-6 py-4">{code.runner_up}</td>
      <td className="px-6 py-4">{code.third_place}</td>
    </tr>
  ));

  function renderElement() {
    if (content.length == 0) {
      return (
        <div>
          <p>Data not found!</p>
        </div>
      );
    } else {
      return <>{content}</>;
    }
  }

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section id="searchbar" className="">
        <div className="container mx-auto">
          <div className="mt-24">
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search by Year, Country, City, etc..."
                  setValue={value.input}
                  onChange={handleChange}
                  required=""
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={getData}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section id="searchbar" className="">
        <div className="container mx-auto">
          <div className="mt-24">
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search by Year, Country, City, etc..."
                  setValue={value.input}
                  onChange={handleChange}
                  required=""
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={getData}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto mt-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Games
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Host Cities
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Host Country
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Opened By
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sports
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Events
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nations
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Competitors
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Winner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Runner Up
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Third Place
                  </th>
                </tr>
              </thead>
              <tbody>{renderElement()}</tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
