/* var users = [];

var addUser = (socketId, personName, roomName) = {
    users.push({})
}
 */
//instead os using this apporach , we will be using Es-6 Class feature

class Users {
    constructor() {
        this.usersArray = [];
    }

    addUser(socketId, personName, roomName) {
        var userObj = {
            socketId,
            personName,
            roomName
        }
        this.usersArray.push(userObj);
        return userObj;
    }

    removeUser(idToFind) {
        //return the user that was removed

        // var userFetched = this.usersArray.filter(user_Obj => user_Obj.socketId === idToFind)[0];
        var userFetched = this.getUser(idToFind);
        if (userFetched) {
            this.usersArray = this.usersArray.filter(user_Obj => user_Obj.socketId !== idToFind);
        }

        console.log(this.usersArray);
        return userFetched;
    }

    /*  removeUser(idToFind) {
         //return the user that was removed
         var userFetched = this.getUser(idToFind);
         console.log("user fetched from getUser() - ", userFetched);
         if(userFetched){
             console.log('inside if');
         this.usersArray = this.usersArray.filter(user_Obj => user_Obj.socketId !== userFetched);
         }

         console.log(this.usersArray);
         return userFetched;
     } */

    getUser(idToFind) {
        //will return the complete User Object
        var userObjOfParticularIdArray = this.usersArray.filter(user_Obj => user_Obj.socketId === idToFind);
        return userObjOfParticularIdArray[0];
    }

    getUserList(roomToFind) {
        //it will return an array which has list of users/client which r currently present in that room

        /*   var users = this.usersArray.filter((user_Obj) =>{
              if(user_Obj.roomName === roomToFind )
              return true;
              else
              return false;
             
          })  */
        //short-hand
        //filter the list user object who belongs to the entered/passed roomName
        //this will return the array(ie-list of object)
        var filteredUsersArray = this.usersArray.filter(user_Obj => user_Obj.roomName === roomToFind);

        //from the filteredUsersArray get only the personName property
        //this will return the array(ie-list of string (person/user name))
        var namesArray = filteredUsersArray.map((userOb) => {
            return userOb.personName
        })

        return namesArray;
    }

}

module.exports = {
    Users
}