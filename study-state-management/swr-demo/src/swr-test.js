import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json())
      
export default function App() {
  const APIURL  = "https://api.github.com/repos/vercel/swr" 
  const { data, error } = useSWR(
    APIURL,
    (url) => fetch(url).then(r => r.json())
  );

  if (error) return "error occurred";
  if (!data) return "Loading...";
  return (
    <div>
      <strong>👁 {data.subscribers_count}</strong>{" "}
    </div>
  );
}
