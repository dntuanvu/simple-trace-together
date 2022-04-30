import { Layout } from "components/users";
import { AddEdit } from "components/tracing/AddEdit";

export default Add;

function Add() {
  return (
    <Layout>
      <h1>Start Tracing</h1>
      <AddEdit />
    </Layout>
  );
}
