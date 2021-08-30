const errorController = {
    
    notFound: async (req, res, next) => {

     res.status(404).json({error: 'resource not found'});
}
}

module.exports = errorController;