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
            image: require("../assets/places/hawkerfare.jpg"),
            icon: "food-fork-drink",
            category: "Food",
            user: 0,
            title: "Hawker Fare",
            description: "One of the most well known street food restuarants in Singapore. The Hiananese Chicken Rice is really good ",
        },
        {
            id: 1,
            image: require("../assets/places/marinabaysands.jpg"),
            icon: "bed",
            category: "Places to Stay",
            user: 0,
            title: "Marina Bay Sands Hotel",
            description: "Luxurious hotel that is home to the infinity pool, you can swim in the pool and relax while admiring the view of the urban landscape of Singapore.",
        },
        {
            id: 2,
            image: require("../assets/places/merlion.jpg"),
            icon: "hiking",
            category: "Activities",
            title: "Merlion",
            description: "The Merlion statue is a historical representation of Singapore's origin.",
        }
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