import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors , formValues , isSubmit]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[a-z0-9](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/i;
        const upperCase = /[A-Z]/;
        const numbers = /[0-9]/;
        const lowerCase = /[a-z]/;

        if (!values.email) {
            errors.email = " ایمیل الزامی است ";
        } else if (!regex.test(values.email)) {
            errors.email = "ایمیل معتبر نیست";
        }
        if (!values.password) {
            errors.password = "رمزعبورالزامی است";
        } else if (values.password.length < 6) {
            errors.password = " رمز عبور باید بیشتر از 6 حرف باشد";
        } else if (!upperCase.test(values.password)) {
            errors.password = "رمز عبور باید شامل یک حرف بزرگ انگلیسی باشد";
        } else if (!numbers.test(values.password)) {
            errors.password = "رمز عبور باید شامل یک عدد باشد";
        } else if (!lowerCase.test(values.password)) {
            errors.password = "رمز عبور باید شامل حروف کوچک انگلیسی باشد";
        }
        return errors;
    };

    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success"> با موفقیت وارد شدید </div>
            ) : null}

            <form onSubmit={handleSubmit}>
                <h1> ورود </h1>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field">
                        <label> ایمیل </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="ایمیل خود را وارد کنید"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.email}</p>
                    <div className="field">
                        <label> رمزعبور </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="رمز عبور خود را وارد کنید"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    <button className="fluid ui button blue"> ارسال </button>
                </div>
            </form>
        </div>
    );
}

export default App;
