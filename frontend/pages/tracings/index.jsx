import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { tracingService } from "services/tracing.service";
import { alertService } from "services";

export default Index;

function Index() {
  const [tracings, setTracings] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();

  useEffect(() => {
    console.log("manage incident, role=" + user.role);
    if (user.role === "admin") {
      tracingService.getAll().then((x) => {
        setTracings(x.tracings);
      });
    } else {
      tracingService.getAllByUser().then((x) => {
        setTracings(x.tracings);
      });
    }
  }, []);

  const trace = (tracing_id) => {
    const body = {
      tracing_id: tracing_id,
    };

    return tracingService
      .createTracing(body)
      .then(() => {
        alertService.success("User traced", {
          keepAfterRouteChange: false,
        });
        router.push("/tracings");
      })
      .catch(alertService.error);
  };

  const renderAddButton = () => {
    if (user.role !== "admin") {
      return (
        <Link href="/tracings/add" className="btn btn-sm btn-success mb-2">
          Add Tracing
        </Link>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Layout>
      <h1>List of Tracings</h1>
      {renderAddButton()}
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>User</th>
            <th style={{ width: "30%" }}>Type</th>
            <th style={{ width: "30%" }}>Detail</th>
            <th style={{ width: "30%" }}>Created</th>
          </tr>
        </thead>
        <tbody>
          {tracings &&
            tracings.map((trace) => (
              <tr key={trace.id}>
                <td>{trace.created_by}</td>
                <td>{trace.type}</td>
                <td>{trace.detail}</td>
                <td>{trace.created_at}</td>
              </tr>
            ))}
          {!tracings && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {tracings && !tracings.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Trace To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
