import { userService } from "services";
import { Link } from "components";

export default Home;

function Home() {
  return (
    <div className="p-4">
      <div className="container">
        <h1>Hi {userService.userValue?.firstName}!</h1>
        <p>You&apos;re logged in with Next.js & JWT!!</p>
        <p>
          <Link href="/incidents">Manage Tracing</Link>
        </p>
      </div>
    </div>
  );
}
