import React from "react";

const UserIDPage = ({ id }) => {
  return <div>{id}</div>;
};

export default UserIDPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const userID = params.uid;
  return {
    props: {
      id: "userid =" + userID,
    },
  };
}
