// Service
const gitService = require("../service/gitService");

// Create Empty Object
const gitController = {};

gitController.get = async (req, res) => {
    try {
        // Get Route Parameter
        const organization = req.params.org;
        // Get Query Parameters
        const numberOfRepositories = req.query.m;
        const numberOfCommittees = req.query.n;

        // Get Statistics
        const repositoryStatistics = await gitService.getRepositoryStatistics(organization, numberOfRepositories, numberOfCommittees);

        // Return Response
        res.json(repositoryStatistics);
    } catch (err) {
        // Log Error
        // console.log(err);

        if (err.message === "404") {
            // Error Resource Not Found
            res.status(404).send();
        }

        // Error Bad Request
        res.status(400).send();
    }
};

module.exports = gitController;

console.log("Executing Controller: gitController.js ...");
console.log("");
