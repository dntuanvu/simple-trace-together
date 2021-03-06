import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { userService, alertService } from "services";

export { AddEdit };

function AddEdit(props) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
    detail: Yup.string().required("Detail is required"),
    /*username: Yup.string()
            .required(' is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters')*/
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.user;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(user.id, data);
  }

  /*
<div className="form-row">
    <div className="form-group col">
        <label>Username</label>
        <input
        name="username"
        type="text"
        {...register("username")}
        className={`form-control ${errors.username ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
    </div>
    <div className="form-group col">
        <label>
        Password
        {!isAddMode && (
            <em className="ml-1">(Leave blank to keep the same password)</em>
        )}
        </label>
        <input
        name="password"
        type="password"
        {...register("password")}
        className={`form-control ${errors.password ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
    </div>
</div>
*/

  function createUser(data) {
    return userService
      .register(data)
      .then(() => {
        alertService.success("User created", { keepAfterRouteChange: true });
        router.push(".");
      })
      .catch(alertService.error);
  }

  function updateUser(id, data) {
    return userService
      .update(id, data)
      .then(() => {
        alertService.success("User updated", {
          keepAfterRouteChange: true,
        });
        router.push("..");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col">
          <label>Type of Incident</label>
          <input
            name="type"
            type="text"
            {...register("type")}
            className={`form-control ${errors.type ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.type?.message}</div>
        </div>
        <div className="form-group col">
          <label>Detail of Incident</label>
          <input
            name="detail"
            type="text"
            {...register("detail")}
            className={`form-control ${errors.detail ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.detail?.message}</div>
        </div>
      </div>

      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary mr-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
        <Link href="/incidents" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
