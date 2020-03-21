// Utility
const gitUtility = require("../utility/gitUtility");

// Create Empty Object
const gitService = {};

gitService.getRepositoryStatistics = async (organization, numberOfRepositories, numberOfCommittees) => {
    // GitHub API, Repositories
    const repositories = await gitUtility.fetchRepositories(organization);

    if (repositories.data === undefined) {
        throw new Error(404);
    }

    // Top 'n' Repositories
    const topNRepositoriesArray = gitUtility.getTopNRepositoriesSorted(repositories.data, numberOfRepositories);

    // GitHub API, committees
    const committeesPromiseArray = await Promise.all(topNRepositoriesArray.map(async (repository) => {
        committees = await gitUtility.fetchCommittees(organization, repository);

        return committees;
    }));

    const committeesArray = committeesPromiseArray.map(promise => promise.data);

    // Top 'm' Committees and Commit Count
    const topMCommitteesArray = gitUtility.getTopMCommitteesSorted(committeesArray, numberOfCommittees);

    // Repository Statistics Object
    const repositoryStatistics = gitUtility.arraysToObject(topNRepositoriesArray, topMCommitteesArray);

    return repositoryStatistics;
};

module.exports = gitService;

// console.log("Executing Service: gitService.js ...");
// console.log("");
