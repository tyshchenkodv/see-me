import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AddArticle from '../../components/AddArticle';
import EditArticle from '../../components/EditArticle';
import ApiCallsAddArticlePage from './apiCalls';
import { useMutation, useQuery } from "react-query";
import LinearProgress from "@material-ui/core/LinearProgress";

function AddArticlePage({ match: { params }, history }) {
    const {id} = params;
    const { createArticleRequest, updateArticleRequest, getArticleRequest } = ApiCallsAddArticlePage();
    const [pageType, setPageType] = useState('new');
    const {mutate: createArticle} = useMutation(createArticleRequest);
    const {mutate: updateArticle} = useMutation(updateArticleRequest);

    const {data: response, isFetching} = useQuery(`article${id}`, () => {
        return getArticleRequest(id);
    });
    const {item: article} = response?.data || {};

    const checkPageType = async () => {
        setPageType(id);
    };
    useEffect(checkPageType, []);

    const onCreateArticle = useCallback(async formData => {
        try {
            await createArticle(formData);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const onUpdateArticle = useCallback(async ({formData, id}) => {
        try {
            await updateArticle({formData, id});
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        pageType === 'new' ?
            <AddArticle createArticle={onCreateArticle} history={history}/> :
            (!isFetching ?
                <EditArticle updateArticle={onUpdateArticle}
                             article={article}
                             history={history}/>
                : <LinearProgress/>)
    )
}

AddArticlePage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    }),
    history: PropTypes.object.isRequired,
};

export default AddArticlePage;
