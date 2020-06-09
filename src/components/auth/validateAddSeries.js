export default function validateAddSeries(values) {
    let errors = {

    }

    //Form input errors
    if (!values.title) {
        errors.title = "You must enter a title"
    }
    if (!values.medium) {
        errors.medium = "Specify a medium (anime, manga, TV or book)"
    }


    // sends any error data back to useFormValidation custom hook
    return errors;
}