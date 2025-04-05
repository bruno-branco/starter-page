export async function getNews() {
  const res = await fetch("http://localhost:3002/starter-page", {
    method: "GET",
    headers: {
      authorization: "O75q8xVMLfNvltej",
    },
  });
  const data = await res.json();
  return data;
}
