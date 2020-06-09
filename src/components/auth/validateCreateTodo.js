export default function validateCreateTodo(values) {
    let errors = {

    }

    //Form input errors
    if (!values.title || (!values.title && !values.description)) {
        errors.title = "You must enter a title"
    }

    // sends any error data back to useFormValidation custom hook
    return errors;
}