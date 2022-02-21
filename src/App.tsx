import { Form } from "./Form/Form";
import formInput from "./mocks/formInput.json";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div>
        <Form
          title="User"
          fields={formInput}
          onSubmit={(values) => console.log({ values })}
          clearFieldsOnSubmit
        />
      </div>
    </div>
  );
}

export default App;
