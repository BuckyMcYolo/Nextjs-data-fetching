import fs from "fs/promises";
import Link from "next/link";
import path from "path";
//executes second
function Home(props) {
  const showProducts = props.products.map((product) => {
    return (
      <li key={product.id}>
        <Link href={`/products/${product.id}`}>{product.title}</Link>
      </li>
    );
  });
  return <ul>{showProducts}</ul>;
}

//executes First & never visible on client
export async function getStaticProps() {
  console.log("Regenerating..");
  const filePath = path.join(process.cwd(), "data", "dummey-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 60,
  };
}

export default Home;
