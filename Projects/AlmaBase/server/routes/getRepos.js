const getRepos = async (req, res) => {
    try {
        // Get route parameter
        let organization = req.params.org;
        // Get query parameters
        let repositories = req.query.n;
        let committees = req.query.m;

        

        res.json({
            "org": organization,
            "n": repositories,
            "m": committees
        })
  } catch (err) {
        // Error Bad Request
        res.status(400).send();
  }
};

module.exports = { getRepos };
