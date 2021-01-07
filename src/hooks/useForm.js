import { useState } from 'react';

export const useForm = (initialState) => {

    const [values, setvalues] = useState(initialState);

    const handleInputChange = ({ target }) => {
        
        setvalues({
            ...values,
            [target.name]: target.value
        });

    }


    const reset = ( newFormState = initialState ) => {
        setvalues(newFormState);
    }


    return [ values, handleInputChange, reset];
}
