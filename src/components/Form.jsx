import useFormContext from "../hooks/useFormContext";
import FormInputs from "./FormInputs";

const Form = () => {
  const { data, setPage, title, canSubmit, page } = useFormContext();

  const handleNext = () => {
    setPage(prev => prev + 1);
  };
  const handlePrev = () => {
    setPage(prev => prev - 1);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(JSON.stringify(data));
  };

  const content = (
    <form
      className="form flex-col"
      onSubmit={handleSubmit}>
      <header>
        <h2>{title[page]}</h2>
        <div className="button-container">
          <button
            type="button"
            className="button"
            onClick={handlePrev}
            disabled={page === 0}>
            Prev{" "}
          </button>
          <button
            type="button"
            className="button"
            onClick={handleNext}
            disabled={page === Object.keys(title).length - 1}>
            {" "}
            Next
          </button>
          <button
            type="submit"
            className="button"
            hidden={!canSubmit}>
            Submit
          </button>
        </div>
      </header>
      <FormInputs />
    </form>
  );

  return content;
};
export default Form;
