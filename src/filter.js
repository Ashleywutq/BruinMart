import itemList from "./items.json";

export default function filter(searchText, maxResults) {
  return itemList
    .filter(item => {
      if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if (item.keywords.includes(searchText)) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}
