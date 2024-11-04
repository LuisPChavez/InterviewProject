const FDA_API =
  "https://api.fda.gov/drug/event.json?api_key=38hv8tRVbi1oNd36yOPt8o022fmT5Wype52m1jVg&";
const NUMBER_OF_ITEMS_PER_PAGE = 15;

export let getAdverseEffectsOfDrug = async (
  drugName: String,
  pageNumber: number
) => {
  const getEffectsFromFdaEndpoint = `${FDA_API}search=patient.drug.openfda.brand_name:"${drugName}"&count=patient.reaction.reactionmeddrapt.exact&limit=200`;
  const response = await fetch(getEffectsFromFdaEndpoint);
  const json = await response.json();
  // Need to subtract one
  // for example for page 1 we need items 0-15 since pageNumber is 1
  const indexOfCurrentPageItem = (pageNumber - 1) * NUMBER_OF_ITEMS_PER_PAGE;
  const indexOfLastItem =
    (pageNumber - 1) * NUMBER_OF_ITEMS_PER_PAGE + NUMBER_OF_ITEMS_PER_PAGE;

  return json.results.slice(indexOfCurrentPageItem, indexOfLastItem);
};
