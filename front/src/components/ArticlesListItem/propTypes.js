import PropTypes from "prop-types";

const typeOfArticle = PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
}).isRequired;

export const typeOfArticlesListItem = PropTypes.shape(
    PropTypes.arrayOf(
        typeOfArticle,
    ).isRequired
).isRequired;
