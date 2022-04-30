import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { userService, alertService } from "services";
import { tracingService } from "services/tracing.service";

export { AddEdit };

function AddEdit(props) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Type is required"),
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
    return createTracing(data);
  }

  function createTracing(data) {
    return tracingService
      .createTracing(data)
      .then(() => {
        alertService.success("Tracing checked", { keepAfterRouteChange: true });
        router.push(".");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col">
          <label>Type of Trace</label>
          <select
              name="type"
              id="type"
              {...register("type")}
              className={`form-control ${errors.type ? "is-invalid" : ""}`}
          >
            <option value="check-in">Check In</option>
            <option value="check-out">Check Out</option>
          </select>
          <div className="invalid-feedback">{errors.type?.message}</div>
        </div>
        <div className="form-group col">
          <label>Detail</label>
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
        <Link href="/incidents" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
