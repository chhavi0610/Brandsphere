export default async function handler(req, res) {
  const { path } = req.query;

  const backendURL =
    "https://chhavi0610.pythonanywhere.com/" + path.join("/");

  const response = await fetch(backendURL, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(req.headers.authorization && {
        Authorization: req.headers.authorization,
      }),
    },
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? JSON.stringify(req.body)
        : undefined,
  });

  const data = await response.text();
  res.status(response.status).send(data);
}
