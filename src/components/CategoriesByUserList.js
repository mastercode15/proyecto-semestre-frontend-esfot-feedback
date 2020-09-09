import React from 'react';

import { useCategoriesByUser } from '../data/useCategoriesByUser';
import ShowError from './ShowError';



const CategoriesByUserList = ( props ) => {

        const { categories , isLoading, isError, mutate } = useCategoriesByUser();



        if( isLoading ) {
            return <p>cargando ...</p>
        }

        if( isError ) {
            return <ShowError error={ isError } />;
        }

        return (
            <>

                    {
                        categories .map( ( category, i ) => (
                            <li key={i}>{category.name}</li>
                        ) )
                    }
            </>
        );
    }
;

export default CategoriesByUserList;
