export default class DataManager {
    static myInstance = null;

    userID = "";

    users = [
            {
                id: 0,
                username: "sam",
                email: "sam@gmail.com",
                password: "asd123",
                profilePicture: require("../assets/users/cookie.jpg"),
            },
        ]
    locations = [
        {
            id: 0,
            image: require("../assets/places/amsterdam.jpg"),
            icon: "airplane",
            category: "",
            user: "user1",
            title: "Amsterdam, Netherlands",
            description: "A nice place to relax, I heard its really cool. Also TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST \n Yep done testing."
        },
        {
            id: 1,
            image: require("../assets/places/japan.jpg"),
            icon: "airplane",
            category: "",
            user: "user1",
            title: "Tokyo, Japan",
        },
        {
            id: 2,
            image: require("../assets/places/newzealand.jpg"),
            icon: "airplane",
            category: "",
            user: "user1",
            title: "New Zealand",
        },
    ]


    static getInstance() {
        if (DataManager.myInstance == null){
            DataManager.myInstance = new DataManager();
        }

        return this.myInstance;
    }

    getUserID(){
        return this.userID;
    }

    setUserID(id){
        this.userID = id;
    }

    getUsers(){
        return this.users;
    }

    addUser(user){
        this.users.push(user);
    }

    getUser(id){
        return this.users.find((item) => item.id === id);
    }

    getLocations(){
        return this.locations;
    }

    addLocation(location){
        this.locations.push(location)
    }
}