import PropTypes from 'prop-types';

export const typeOfArticle = PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
}).isRequired;
