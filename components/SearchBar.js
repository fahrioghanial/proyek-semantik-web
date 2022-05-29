export default function SearchBar(props) {
  function handleChange(event) {
    props.onChange(event.target.value);
  }

  function getSomething(event) {
    props.onClick(event.target.value);
  }
  return (
    <>
      <section id="searchbar" className="">
        <div className="container mx-auto">
          <div className="">
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                Search
              </label>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type here..."
                  setValue={props.value}
                  onChange={handleChange}
                  required=""
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2"
                  onClick={getSomething}
                >
                  <svg
                    className="w-5 h-5 text-white"
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
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
