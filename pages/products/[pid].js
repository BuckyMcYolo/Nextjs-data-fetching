import fs from "fs/promises";
import path from "path";

const ProductDetailPage = ({ loadedProduct }) => {
  //use this condtional loading screen to prevent getStaticPAths from erroring when not proving all params
  //   if (!loadedProduct) {
  //     return <p>...Loading</p>;
  //   }

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummey-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

//Will error out if only this is left since NextJS doesn't know how many pages there could be on a dynamic route. ie [pid].js. Need to add a getStaticPaths function below
//GetStaticProps is great to use for data that doesn't change often. ie blog posts, products, etc. It is also great for SEO, but not good for private data that does not need to be indexed by search engines.
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}
//Dont know if this will be useful for me bc i dont want the data being accessible to web crawlers, but would be useful for something like a public marketplace
//you always need to use getStaticPaths when rendering dynamic routes with getStaticProps(pages you want pre rendered)
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: pathsWithParams,

    //fallback : true - tells NextJs that values not specified by the paths parameter are still valid, but they do not need to be pre-generated. Therefore they are generated just in time by the server. This may be pages that are rarely visited or unimportant

    //fallback : false - tells NextJs that any value not specified by the paths parameter is invalid. This is the default behavior.

    //fallback:'blocking'-  takes slightly longer than conditionally rendering a loading screen while fetching but removes boilerplate and waits on server to render content
    fallback: false,
  };
}

export default ProductDetailPage;
