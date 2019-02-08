const users = [
    {
        id: 1,
        name: "User1",
        schoolID: 101
    },
    {
        id: 2,
        name: "User2",
        schoolID: 999
    }
];

const grades = [
    {
        id: 1,
        schoolID: 101,
        grade: 86
    },
    {
        id: 2,
        schoolID: 999,
        grade: 100
    },
    {
        id: 3,
        schoolID: 101,
        grade: 80
    }
];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id == id);

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with ID of ${id}.`);
        }
    });
};

const getGrades = (schoolID) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolID == schoolID));
    });
};

const getStatus = (id) => {
    let user;
    return getUser(id).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolID);
    }).then((grades) => {
        let avg = 0;

        if (grades.length > 0) {
            avg = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }

        return(`${user.name} has a ${avg}% in the class`);
    });
};

const getStatusAlt = async (id) => {
    // throw new Error("This is an error!");//Equivalent to rejecting the promise
    const user = await getUser(id);
    const grades = await getGrades(user.schoolID);

    let avg = 0;

    if (grades.length > 0) {
        avg = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return (`${user.name} has a ${avg}% in the class`);
};

// getUser(21)
//     .then(user => console.log(user))
//     .catch(err => console.log(err));

// getGrades(21)
//     .then(grades => console.log(grades))
//     .catch(err => console.log(err));

// getStatus(2)
//     .then(status => console.log(status))
//     .catch(err => console.log(err));

getStatusAlt(22)
    .then(user => console.log(user))
    .catch(err => console.log(err));