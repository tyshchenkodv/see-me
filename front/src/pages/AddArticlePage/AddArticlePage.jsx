import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AddArticle from '../../components/AddArticle';
import { createArticleRequest } from "./apiCalls";
import { useMutation } from "react-query";

function AddArticlePage({ match: { params } }) {
    const [pageType, setPageType] = useState('new');
    const {mutate: createArticle} = useMutation(createArticleRequest);

    const checkPageType = () => {
        setPageType(params.id);
    }
    useEffect(checkPageType,[]);

    const onCreateArticle = useCallback(async formData => {
        const token = window.localStorage.getItem('token');
        try {
            await createArticle({token, formData});
        }catch (e) {
            console.log(e);
        }
    })

    return(
        pageType === 'new' ?
        <AddArticle createArticle={onCreateArticle} /> : <p>Edit article</p>
    )
}

AddArticlePage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    }),
};

export default AddArticlePage;
