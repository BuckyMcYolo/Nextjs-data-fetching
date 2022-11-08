import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = (props) => {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-e43f5-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transFormedSales = [];
      for (const key in data) {
        transFormedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transFormedSales);
    }
  }, [data]);
  console.log(data);
  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-course-e43f5-default-rtdb.firebaseio.com/sales.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const transFormedSales = [];
  //         for (const key in data) {
  //           transFormedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transFormedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);
  //   console.log(sales);

  if (error) {
    return <h1>Failed to load</h1>;
  }

  if (!data || !sales) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>
        Last sales:
        {sales.map((sale) => {
          return (
            <div key={sale.id}>
              buyer: {sale.username} - volume: ${sale.volume}
            </div>
          );
        })}
      </h1>
    </div>
  );
};

export async function getStaticProps() {
  return fetch(
    "https://nextjs-course-e43f5-default-rtdb.firebaseio.com/sales.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const transFormedSales = [];
      for (const key in data) {
        transFormedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      return { props: { sales: transFormedSales } };
    });
}

export default LastSales;
