// Custom hook for form input
// Suitable for cases when you may have multiple forms that can't be handled with useState
import React, { useState, useEffect } from "react";

function useFormValidation(initialState, validate, authenticate) {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Check if form has been submitted
        if (isSubmitting) {
            //pass errors object to Object.keys to make it an array & check if any errors
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                // call the function passed as 3rd arg useFormValidation 
                authenticate();
                setIsSubmitting(false)
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    function handleChange(event) {
        //event will be undefined unless we persist data
        event.persist();
        //Return an object by adding a set of () 
        setValues(previousValues => ({
            ...previousValues,
            // dynamically updates the event property for the form being filled in
            [event.target.name]: event.target.value
        }));
    }

    // Validate when user clicks away from a field (i.e. a "blur" event)
    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setIsSubmitting(true);
    }
    return { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }
}

export default useFormValidation;
