import PropTypes from "prop-types";

const user = {
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
};

const file = {
    id: PropTypes.number,
    name: PropTypes.string,
    path: PropTypes.string,
    size: PropTypes.number,
};

const avatar = {
    fileId: PropTypes.number,
    file: PropTypes.shape(file),
};

const likes = {
    userId: PropTypes.number,
    user: PropTypes.shape({
        id: PropTypes.number,
    }),
    date: PropTypes.string,
};

const articles = PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape(file)),
    createdAt: PropTypes.string,
    editedAt: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.shape(likes)),
});

export const typeOfUserData = PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    avatar: PropTypes.shape(avatar),
    friends: PropTypes.arrayOf(PropTypes.shape(user)),
    articles: PropTypes.arrayOf(articles),
});
