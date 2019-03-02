const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "User 1",
            room: "Room 1"
        }, {
            id: "2",
            name: "User 2",
            room: "Room 2"
        }, {
            id: "3",
            name: "User 3",
            room: "Room 1"
        }];
    });

    it("should add new user", () => {
        const newUsers = new Users();
        const user = {
            id: "123",
            name: "Sankar",
            room: "Room1"
        };

        newUsers.addUser(user.id, user.name, user.room);

        expect(newUsers.users).toEqual([user]);
    });

    it("should remove a user", () => {
        const userID = "1";
        const user = users.removeUser(userID);

        expect(user.id).toEqual(userID);
        expect(users.users.length).toBe(2);
    });

    it("should not remove a user", () => {
        const userID = "4";
        const user = users.removeUser(userID);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it("should find user", () => {
        const userID = "1";
        const user = users.getUser(userID);

        expect(user.id).toEqual(userID);
    });

    it("should not find user", () => {
        const userID = "4";
        const user = users.getUser(userID);

        expect(user).toBeFalsy();
    });

    it("should return names for Room 1", () => {
        const userList = users.getUserList("Room 1");

        expect(userList).toEqual(["User 1", "User 3"]);
    });

    it("should return names for Room 2", () => {
        const userList = users.getUserList("Room 2");

        expect(userList).toEqual(["User 2"]);
    });
});
