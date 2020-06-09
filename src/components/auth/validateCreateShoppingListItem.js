export default function validateCreateShoppingListItem(values) {
    let errors = {

    }

    //Form input errors
    if (!values.title || (!values.title && !values.description)) {
        errors.title = "You must enter a title"
    }

    if (!values.description) {
        errors.description = "You must enter a description"
    }

    // sends any error data back to useFormValidation custom hook
    return errors;
}