//We cannot make a user ID page a dynamic route because then anyone who inputs that ID into the browser search bar can peak in and see some of that data. Instead we want to identify the user making the request with the help of JSON web tokens or cookies. And we make sure that user still has those auth tokens by using getServerSideProps

const UserProfilePage = (props) => {
  return (
    <div>
      <h1>User Name: {props.userName}</h1>
    </div>
  );
};

//uses the same format with props etc.. as getStaticProps
//getServerSideProps is great for data that changes often. ie user data, user settings, etc. It is also great for private data that does not need to be indexed by search engines.
//getServerSideProps context has special objects available to it such as the request and response objects along with their headers, sessions, tokens and everything else the server uses to communicate
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log("server side code");
  return {
    props: {
      userName: "Max",
    },
  };
}

export default UserProfilePage;
