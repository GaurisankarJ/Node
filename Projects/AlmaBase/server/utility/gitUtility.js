// Axios Promised Based Http Client
const axios = require("axios");

// Create Empty Object
const gitUtility = {};

// Fetch Repositories from GitHub API
gitUtility.fetchRepositories = async (organization) => {
    try {
        return await axios.get(
            `https://api.github.com/orgs/${organization}/repos`
        );
    } catch (error) {
        return error;
    }
};

// Return 'n' Sorted Repositories
gitUtility.getTopNRepositoriesSorted = (repositories, numberOfRepositories) => repositories.sort((repoA, repoB) => repoB.forks - repoA.forks).filter((_, index) => index < numberOfRepositories).map(repository => repository.name);

// Fetch Committees from GitHub API
gitUtility.fetchCommittees = async (organization, repositoryName) => {
    try {
        return await axios.get(
            `https://api.github.com/repos/${organization}/${repositoryName}/commits`
        );
    } catch (error) {
        return error;
    }
};

// Return 'm' Sorted Committees by Commit Count
gitUtility.getTopMCommitteesSorted = (committeesArray, numberOfCommittees) => {
    const topMCommittees = committeesArray.map((committees) => {
        const map = new Map();

        committees.forEach((committer) => {
            if (map.has(committer.commit.committer.name)) {
                map.set(committer.commit.committer.name, map.get(committer.commit.committer.name) + 1);
            } else {
                map.set(committer.commit.committer.name, 1);
            }
        });

        const sortedMap = Array.from(map).sort((a, b) => b[1] - a[1]);

        return sortedMap.map((item) => {
            return {
                name: item[0],
                count: item[1]
            };
        }).filter((_, index) => index < numberOfCommittees);
    });

    return topMCommittees;
};

// Arrays to Object
gitUtility.arraysToObject = (arrayOne, arrayTwo) => {
    const object = arrayOne.reduce((obj, item, index) => {
        obj[item] = arrayTwo[index];
        return obj;
    }, {});

    return object;
};

module.exports = gitUtility;
