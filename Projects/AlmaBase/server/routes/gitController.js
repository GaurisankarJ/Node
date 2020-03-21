// Axios Promised Based Http Client
const axios = require("axios");

// Fetch Repositories from GitHub API
const fetchRepositories = async (organization) => {
    try {
        return await axios.get(
            `https://api.github.com/orgs/${organization}/repos`
        );
    } catch (error) {
        return error;
    }
};

const getRepos = async (req, res) => {
    try {
        // Get Route Parameter
        const organization = req.params.org;
        // Get Query Parameters
        const numberOfRepositories = req.query.n;
        const numberOfCommittees = req.query.m;

        // GitHub API, Repositories
        const repositories = await fetchRepositories(organization);

        console.log(repositories);
        res.json({
            org: organization,
            n: numberOfRepositories,
            m: numberOfCommittees
        });
    } catch (err) {
        // Log Error
        console.log(err);

        // Error Bad Request
        res.status(400).send();
    }
};

module.exports = { getRepos };
