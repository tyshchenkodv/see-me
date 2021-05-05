module.exports = function prepareComments (comments, commentId = null) {
    let results = comments.filter(({ parentId }) => parentId === commentId);

    if (!results.length) {
        return []
    }

    return results.map((comment => ({
        ...comment,
        items: prepareComments(comments, comment.id)
    })))
}
